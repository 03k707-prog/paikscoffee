import sqlite3
import pandas as pd
import os
import re

csv_items_path = r"C:\Users\JO\Desktop\PAIK\items_database.csv"
db_path = r"C:\Users\JO\Desktop\PAIK\items_database.db"
output_ingredients_csv = r"C:\Users\JO\Desktop\PAIK\recipe_ingredients_database.csv"

# 1. Packaging items definition
packaging_items = [
    {"품목명": "종이컵 (HOT)", "규격": "16oz", "단위": "EA", "단가": 50, "과세구분": "과세", "원본품목명": "종이컵 (HOT)"},
    {"품목명": "핫컵 뚜껑 (HOT)", "규격": "16oz", "단위": "EA", "단가": 20, "과세구분": "과세", "원본품목명": "핫컵 뚜껑 (HOT)"},
    {"품목명": "컵홀더 (HOT)", "규격": "16oz", "단위": "EA", "단가": 30, "과세구분": "과세", "원본품목명": "컵홀더 (HOT)"},
    {"품목명": "아이스컵 (24oz)", "규격": "24oz", "단위": "EA", "단가": 80, "과세구분": "과세", "원본품목명": "아이스컵 (24oz)"},
    {"품목명": "아이스컵 뚜껑 (24oz)", "규격": "24oz", "단위": "EA", "단가": 25, "과세구분": "과세", "원본품목명": "아이스컵 뚜껑 (24oz)"},
    {"품목명": "컵홀더 (24oz)", "규격": "24oz", "단위": "EA", "단가": 30, "과세구분": "과세", "원본품목명": "컵홀더 (24oz)"},
    {"품목명": "일반 빨대", "규격": "Standard", "단위": "EA", "단가": 10, "과세구분": "과세", "원본품목명": "일반 빨대"},
    {"품목명": "아이스컵 (32oz)", "규격": "32oz", "단위": "EA", "단가": 120, "과세구분": "과세", "원본품목명": "아이스컵 (32oz)"},
    {"품목명": "아이스컵 뚜껑 (32oz)", "규격": "32oz", "단위": "EA", "단가": 35, "과세구분": "과세", "원본품목명": "아이스컵 뚜껑 (32oz)"},
    {"품목명": "컵홀더 (32oz)", "규격": "32oz", "단위": "EA", "단가": 40, "과세구분": "과세", "원본품목명": "컵홀더 (32oz)"}
]

def update_packaging():
    if not os.path.exists(csv_items_path):
        print(f"Error: {csv_items_path} not found.")
        return
        
    df_items = pd.read_csv(csv_items_path, encoding="utf-8-sig")
    existing_originals = set(df_items["원본품목명"].dropna().tolist())
    
    # Get last ID number
    last_id_num = 0
    for id_str in df_items["품목ID"].tolist():
        match = re.search(r'P(\d+)', str(id_str))
        if match:
            last_id_num = max(last_id_num, int(match.group(1)))
            
    new_items_added = []
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Insert new packaging items into SQLite and build new items list
    for item in packaging_items:
        if item["원본품목명"] not in existing_originals:
            last_id_num += 1
            item_id = f"P{last_id_num:04d}"
            item_to_add = {
                "품목ID": item_id,
                "품목명": item["품목명"],
                "규격": item["규격"],
                "단위": item["단위"],
                "단가": item["단가"],
                "과세구분": item["과세구분"],
                "원본품목명": item["원본품목명"]
            }
            new_items_added.append(item_to_add)
            existing_originals.add(item["원본품목명"])
            
            # Insert into SQLite
            cursor.execute("""
            INSERT OR REPLACE INTO items (id, name, spec, unit, unit_price, tax_type, original_name)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (item_id, item["품목명"], item["규격"], item["단위"], item["단가"], item["과세구분"], item["원본품목명"]))
            
    if new_items_added:
        df_new = pd.DataFrame(new_items_added)
        df_items_combined = pd.concat([df_items, df_new], ignore_index=True)
        try:
            df_items_combined.to_csv(csv_items_path, index=False, encoding="utf-8-sig")
            print(f"Added {len(new_items_added)} new packaging items to CSV database.")
        except PermissionError:
            print("\n[ERROR] Permission Denied: The target CSV file 'items_database.csv' is currently open.")
            print("Please close 'items_database.csv' in Excel and try running the command again.")
            conn.close()
            exit(13)
            
    # Reload items to get map
    df_items = pd.read_csv(csv_items_path, encoding="utf-8-sig")
    item_id_map = {}
    for idx, row in df_items.iterrows():
        name = str(row["품목명"]).strip()
        iid = str(row["품목ID"]).strip()
        item_id_map[name] = iid
        
    # Get all recipes
    cursor.execute("SELECT id, menu_name, temperature FROM recipes")
    recipes = cursor.fetchall()
    
    # 2. Add packaging materials to each recipe in SQLite
    # We will first delete any existing packaging rows from recipe_ingredients to avoid duplication if rerun
    cursor.execute("""
    DELETE FROM recipe_ingredients 
    WHERE ingredient_name IN (
        '종이컵 (HOT)', '핫컵 뚜껑 (HOT)', '컵홀더 (HOT)',
        '아이스컵 (24oz)', '아이스컵 뚜껑 (24oz)', '컵홀더 (24oz)', '일반 빨대',
        '아이스컵 (32oz)', '아이스컵 뚜껑 (32oz)', '컵홀더 (32oz)'
    )
    """)
    
    added_rows_count = 0
    
    for r_id, menu_name, temperature in recipes:
        menu_name_upper = menu_name.upper()
        temp_upper = temperature.upper()
        
        is_32oz = "빽사이즈" in menu_name_upper or "32OZ" in menu_name_upper or "32OZ" in temp_upper
        is_iced = "ICED" in temp_upper or "ICED" in menu_name_upper
        is_hot = "HOT" in temp_upper or "HOT" in menu_name_upper
        
        # Determine packaging set
        pkg_set = []
        if is_32oz:
            pkg_set = [
                ("아이스컵 (32oz)", 1.0, "EA"),
                ("아이스컵 뚜껑 (32oz)", 1.0, "EA"),
                ("컵홀더 (32oz)", 1.0, "EA"),
                ("일반 빨대", 1.0, "EA")
            ]
        elif is_iced:
            pkg_set = [
                ("아이스컵 (24oz)", 1.0, "EA"),
                ("아이스컵 뚜껑 (24oz)", 1.0, "EA"),
                ("컵홀더 (24oz)", 1.0, "EA"),
                ("일반 빨대", 1.0, "EA")
            ]
        elif is_hot:
            pkg_set = [
                ("종이컵 (HOT)", 1.0, "EA"),
                ("핫컵 뚜껑 (HOT)", 1.0, "EA"),
                ("컵홀더 (HOT)", 1.0, "EA")
            ]
            
        for ing_name, amount, unit in pkg_set:
            item_id = item_id_map.get(ing_name)
            if item_id:
                cursor.execute("""
                INSERT INTO recipe_ingredients (recipe_id, item_id, ingredient_name, amount, unit)
                VALUES (?, ?, ?, ?, ?)
                """, (r_id, item_id, ing_name, amount, unit))
                added_rows_count += 1
                
    conn.commit()
    conn.close()
    print(f"Added {added_rows_count} packaging ingredients rows to SQLite table.")
    
    # 3. Export recipe_ingredients to CSV
    conn = sqlite3.connect(db_path)
    df_ing = pd.read_sql_query("SELECT recipe_id, item_id, ingredient_name, amount, unit FROM recipe_ingredients", conn)
    conn.close()
    
    # Rename columns to match the output CSV style
    df_ing.columns = ["레시피ID", "품목ID", "레시피원료명", "소모량", "단위"]
    try:
        df_ing.to_csv(output_ingredients_csv, index=False, encoding="utf-8-sig")
        print(f"Successfully saved updated ingredients mapping to CSV: {output_ingredients_csv}")
    except PermissionError:
        print("\n[ERROR] Permission Denied: The target CSV file 'recipe_ingredients_database.csv' is currently open.")
        print("Please close the CSV file and try running the command again.")
        exit(13)

if __name__ == "__main__":
    update_packaging()

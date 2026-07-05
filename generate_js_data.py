import pandas as pd
import json
import os

csv_items_path = r"C:\Users\JO\Desktop\PAIK\items_database.csv"
csv_recipes_path = r"C:\Users\JO\Desktop\PAIK\recipes_database.csv"
csv_ingredients_path = r"C:\Users\JO\Desktop\PAIK\recipe_ingredients_database.csv"
output_js_path = r"c:\Users\JO\Desktop\PAIK\data.js"

def generate_js_data():
    if not os.path.exists(csv_items_path) or not os.path.exists(csv_recipes_path) or not os.path.exists(csv_ingredients_path):
        print("Error: Database CSV files not found.")
        return
        
    df_items = pd.read_csv(csv_items_path, encoding="utf-8-sig")
    df_recipes = pd.read_csv(csv_recipes_path, encoding="utf-8-sig")
    df_ingredients = pd.read_csv(csv_ingredients_path, encoding="utf-8-sig")
    
    items_list = df_items.to_dict(orient="records")
    recipes_list = df_recipes.to_dict(orient="records")
    ingredients_list = df_ingredients.to_dict(orient="records")
    
    # Process items to add initial inventory quantity
    # We will estimate a default stock level for each item.
    # For example, 100 for beans, 50 for milk, etc.
    for item in items_list:
        name = item["품목명"]
        unit = item["단위"]
        
        # Estimate safety and current stock based on category
        if "원두" in name:
            item["current_qty"] = 15.0  # 15 kg
            item["safety_qty"] = 5.0
            item["category"] = "원두/커피"
        elif "우유" in name or "생크림" in name or "연유" in name:
            item["current_qty"] = 30.0  # 30 EA/packs
            item["safety_qty"] = 10.0
            item["category"] = "유제품"
        elif "시럽" in name or "베이스" in name or "퓨레" in name or "소스" in name:
            item["current_qty"] = 25.0
            item["safety_qty"] = 8.0
            item["category"] = "시럽/소스"
        elif "파우더" in name:
            item["current_qty"] = 12.0
            item["safety_qty"] = 4.0
            item["category"] = "파우더류"
        elif "컵" in name or "뚜껑" in name or "빨대" in name or "홀더" in name or "캐리어" in name:
            item["current_qty"] = 1500.0
            item["safety_qty"] = 500.0
            item["category"] = "일회용품"
        elif "냉동" in name or "딸기" in name or "망고" in name or "블루베리" in name or "수박" in name:
            item["current_qty"] = 18.0
            item["safety_qty"] = 6.0
            item["category"] = "냉동과일"
        else:
            item["current_qty"] = 50.0
            item["safety_qty"] = 15.0
            item["category"] = "기타자재"
            
    # Structure recipe ingredients as a nested dictionary inside recipes for easy access in frontend
    # recipe_map[recipe_id] = { menu_name, temperature, ingredients: [{item_id, name, amount, unit}] }
    recipe_dict = {}
    for r in recipes_list:
        r_id = r["레시피ID"]
        recipe_dict[r_id] = {
            "id": r_id,
            "menu_name": r["메뉴명"],
            "temperature": r["구분"],
            "ingredients": []
        }
        
    for ing in ingredients_list:
        r_id = ing["레시피ID"]
        if r_id in recipe_dict:
            recipe_dict[r_id]["ingredients"].append({
                "item_id": ing["품목ID"],
                "name": ing["레시피원료명"],
                "amount": ing["소모량"],
                "unit": ing["단위"]
            })
            
    js_content = f"""// 광희's 빽다방 데이터베이스 익스포트 파일
const INITIAL_ITEMS = {json.dumps(items_list, ensure_ascii=False, indent=2)};
const RECIPES = {json.dumps(list(recipe_dict.values()), ensure_ascii=False, indent=2)};
"""
    
    with open(output_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Generated {output_js_path}")

if __name__ == "__main__":
    generate_js_data()

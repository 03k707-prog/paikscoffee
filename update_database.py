import os
import re
import json
import sqlite3
import pandas as pd

existing_csv_path = r"C:\Users\JO\Desktop\PAIK\items_database.csv"
existing_db_path = r"C:\Users\JO\Desktop\PAIK\items_database.db"
new_excel_path = r"C:\Users\JO\Desktop\PAIK\data\주문현황_OMS260630539944_20260705.xlsx"
update_log_path = r"C:\Users\JO\Desktop\PAIK\update_log.txt"

def update_database():
    if not os.path.exists(existing_csv_path):
        print(f"Error: Existing CSV not found at {existing_csv_path}")
        return
    if not os.path.exists(new_excel_path):
        print(f"Error: New Excel file not found at {new_excel_path}")
        return

    # 1. Load existing items
    df_existing = pd.read_csv(existing_csv_path, encoding="utf-8-sig")
    existing_originals = set(df_existing["원본품목명"].dropna().tolist())
    
    # Get the last used ID number to continue sequence
    last_id_num = 0
    if len(df_existing) > 0:
        id_list = df_existing["품목ID"].tolist()
        numeric_ids = []
        for id_str in id_list:
            match = re.search(r'P(\d+)', str(id_str))
            if match:
                numeric_ids.append(int(match.group(1)))
        if numeric_ids:
            last_id_num = max(numeric_ids)

    print(f"Existing items: {len(df_existing)}, Last ID number: {last_id_num}")

    # 2. Parse new Excel file
    xls = pd.ExcelFile(new_excel_path)
    sheet_name = xls.sheet_names[0]
    df_raw = pd.read_excel(new_excel_path, sheet_name=sheet_name, header=None)
    
    header_idx = None
    for i, row in df_raw.iterrows():
        row_str = [str(x) for x in list(row)]
        if any("No" in x or "No." in x for x in row_str):
            header_idx = i
            break
            
    if header_idx is None:
        print("Error: Could not find header row in the new Excel file.")
        return
        
    df_new_raw = pd.read_excel(new_excel_path, sheet_name=sheet_name, skiprows=header_idx)
    first_col = df_new_raw.columns[0]
    
    # Filter rows that have valid numeric No.
    df_new_filtered = df_new_raw[pd.to_numeric(df_new_raw[first_col], errors='coerce').notnull()]
    
    new_added_items = []
    skipped_items_count = 0
    
    # SQLite connection
    conn = sqlite3.connect(existing_db_path)
    cursor = conn.cursor()
    
    # Ensure items table exists in DB
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        spec TEXT,
        unit TEXT,
        unit_price INTEGER,
        tax_type TEXT,
        original_name TEXT
    )
    """)
    
    for idx, row in df_new_filtered.iterrows():
        raw_name = str(row.get("품목명", "")).strip()
        unit = str(row.get("단위", "")).strip()
        unit_price = int(row.get("단가", 0))
        tax = int(row.get("세액", 0))
        
        # Check if item is already present
        if raw_name in existing_originals:
            skipped_items_count += 1
            continue
            
        # Determine tax type
        tax_type = "과세" if tax > 0 else "면세"
        
        # Split name and spec
        name = raw_name
        spec = ""
        match = re.search(r'(.*)\s+\[(.*)\]\s*$', raw_name)
        if match:
            name = match.group(1).strip()
            spec = match.group(2).strip()
        else:
            match2 = re.search(r'(.*)\[(.*)\]\s*$', raw_name)
            if match2:
                name = match2.group(1).strip()
                spec = match2.group(2).strip()
                
        # Generate new ID
        last_id_num += 1
        new_id = f"P{last_id_num:04d}"
        
        new_item = {
            "품목ID": new_id,
            "품목명": name,
            "규격": spec if spec else "규격없음",
            "단위": unit,
            "단가": unit_price,
            "과세구분": tax_type,
            "원본품목명": raw_name
        }
        
        new_added_items.append(new_item)
        existing_originals.add(raw_name) # Add to set to avoid duplicates
        
        # Insert into SQLite
        cursor.execute("""
        INSERT OR REPLACE INTO items (id, name, spec, unit, unit_price, tax_type, original_name)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            new_item["품목ID"],
            new_item["품목명"],
            new_item["규격"],
            new_item["단위"],
            new_item["단가"],
            new_item["과세구분"],
            new_item["원본품목명"]
        ))
        
    conn.commit()
    conn.close()
    
    # 3. Append to CSV (Handle PermissionError if file is open in Excel)
    if new_added_items:
        df_new_items = pd.DataFrame(new_added_items)
        df_combined = pd.concat([df_existing, df_new_items], ignore_index=True)
        try:
            df_combined.to_csv(existing_csv_path, index=False, encoding="utf-8-sig")
            print(f"Successfully added {len(new_added_items)} new items to CSV.")
        except PermissionError:
            print("\n[ERROR] Permission Denied: The target CSV file is currently open in Excel or another program.")
            print("Please close 'items_database.csv' and try running the command again.")
            exit(13)
    else:
        print("No new items were found to add.")
        
    # Write details to log file
    with open(update_log_path, "w", encoding="utf-8") as f:
        f.write(f"=== UPDATE LOG: {pd.Timestamp.now()} ===\n")
        f.write(f"Source Excel: {new_excel_path}\n")
        f.write(f"Skipped existing items (already in DB): {skipped_items_count}\n")
        f.write(f"Newly added items count: {len(new_added_items)}\n\n")
        
        if new_added_items:
            f.write("--- Newly Added Items List ---\n")
            for item in new_added_items:
                f.write(f"ID: {item['품목ID']} | Name: {item['품목명']} | Spec: {item['규격']} | Unit: {item['단위']} | Price: {item['단가']} | Tax: {item['과세구분']}\n")
        else:
            f.write("No new items added in this update.\n")

    print(f"Log written to {update_log_path}")

if __name__ == "__main__":
    update_database()

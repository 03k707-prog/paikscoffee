import os
import json
import re
import pandas as pd
import sqlite3

json_path = r"C:\Users\JO\Desktop\PAIK\items.json"
output_csv_path = r"C:\Users\JO\Desktop\PAIK\items_database.csv"
output_db_path = r"C:\Users\JO\Desktop\PAIK\items_database.db"

def parse_items():
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return
        
    with open(json_path, "r", encoding="utf-8") as f:
        raw_items = json.load(f)
        
    db_items = []
    
    for idx, item in enumerate(raw_items, 1):
        raw_name = item.get("품목명", "")
        unit = item.get("단위", "")
        unit_price = item.get("단가", 0)
        tax = item.get("세액", 0)
        
        # Determine tax type
        # If tax > 0, it's taxable (과세). Otherwise, it's tax-exempt (면세).
        tax_type = "과세" if tax > 0 else "면세"
        
        # Extract specification from brackets [ ... ]
        # e.g., "오레오 분쇄쿠키 [250G]" -> name: "오레오 분쇄쿠키", spec: "250G"
        name = raw_name
        spec = ""
        
        match = re.search(r'(.*)\s+\[(.*)\]\s*$', raw_name)
        if match:
            name = match.group(1).strip()
            spec = match.group(2).strip()
        else:
            # Try to match bracket at the end without spaces
            match2 = re.search(r'(.*)\[(.*)\]\s*$', raw_name)
            if match2:
                name = match2.group(1).strip()
                spec = match2.group(2).strip()
                
        db_items.append({
            "품목ID": f"P{idx:04d}",
            "품목명": name,
            "규격": spec if spec else "규격없음",
            "단위": unit,
            "단가": unit_price,
            "과세구분": tax_type,
            "원본품목명": raw_name
        })
        
    # Create CSV
    df = pd.DataFrame(db_items)
    df.to_csv(output_csv_path, index=False, encoding="utf-8-sig")
    print(f"Successfully saved to CSV: {output_csv_path}")
    
    # Create SQLite database
    conn = sqlite3.connect(output_db_path)
    cursor = conn.cursor()
    
    # Create table
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
    
    # Insert data
    for item in db_items:
        cursor.execute("""
        INSERT OR REPLACE INTO items (id, name, spec, unit, unit_price, tax_type, original_name)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            item["품목ID"],
            item["품목명"],
            item["규격"],
            item["단위"],
            item["단가"],
            item["과세구분"],
            item["원본품목명"]
        ))
        
    conn.commit()
    conn.close()
    print(f"Successfully saved to SQLite DB: {output_db_path}")

if __name__ == "__main__":
    parse_items()

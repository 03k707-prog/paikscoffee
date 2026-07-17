import os
import pandas as pd
import json

excel_path = r"C:\Users\JO\Desktop\PAIK\상품별매출_상품옵션통합보기_20260717_17_29_53.xlsx"
output_js_path = r"C:\Users\JO\Desktop\PAIK\product_sales_data.js"

def main():
    if not os.path.exists(excel_path):
        print(f"Error: File not found at {excel_path}")
        return
        
    xls = pd.ExcelFile(excel_path)
    sheet_name = xls.sheet_names[0]
    
    # Read sheet raw to find header
    df_raw = pd.read_excel(excel_path, sheet_name=sheet_name, header=None)
    
    header_idx = None
    for i, row in df_raw.iterrows():
        row_str = [str(x) for x in list(row)]
        if any("상품명" in x or "판매 수량" in x or "매출 합계" in x for x in row_str):
            header_idx = i
            break
            
    if header_idx is None:
        print("Error: Header row not found")
        return
        
    df = pd.read_excel(excel_path, sheet_name=sheet_name, skiprows=header_idx)
    
    # Clean data (remove totals if any)
    # The rankings are usually numeric, so keep rows where '순위' is numeric
    df_clean = df[pd.to_numeric(df['순위'], errors='coerce').notnull()].copy()
    
    records = []
    for idx, row in df_clean.iterrows():
        # Handle nan in values
        record = {
            "rank": int(row['순위']),
            "category": str(row.get('판매 카테고리명', '기타')).strip(),
            "name": str(row.get('상품명', '이름없음')).strip(),
            "qty": int(row.get('판매 수량', 0)),
            "total_sales": int(row.get('매출 합계', 0)),
            "dine_in": int(row.get('내점', 0)),
            "take_out": int(row.get('포장', 0)),
            "delivery": int(row.get('배달(배달팁 포함)', 0))
        }
        records.append(record)
        
    # Write to product_sales_data.js
    js_content = f"""// 월간 상품별 매출 분석 데이터 (7월 누적)
const PRODUCT_SALES_RECORD = {json.dumps(records, ensure_ascii=False, indent=2)};
"""
    
    with open(output_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Generated {output_js_path} with {len(records)} products.")

if __name__ == "__main__":
    main()

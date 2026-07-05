import os
import pandas as pd
import json

excel_path = r"C:\Users\JO\Desktop\PAIK\OMS260703551326_20260705.xlsx"
output_json_path = r"C:\Users\JO\Desktop\PAIK\items.json"
output_txt_path = r"C:\Users\JO\Desktop\PAIK\items_analysis.txt"

def analyze():
    if not os.path.exists(excel_path):
        print(f"Error: File not found at {excel_path}")
        return
        
    xls = pd.ExcelFile(excel_path)
    sheet_name = xls.sheet_names[0]
    
    # Read sheet without header first to find where the table starts
    df_raw = pd.read_excel(excel_path, sheet_name=sheet_name, header=None)
    
    # Print the raw rows to file to inspect them in UTF-8
    with open(output_txt_path, "w", encoding="utf-8") as f:
        f.write("=== RAW ROWS ===\n")
        for i, row in df_raw.iterrows():
            f.write(f"Row {i}: {list(row)}\n")
            
        # Let's find where the table starts.
        # Usually it starts with something like "No." or "No" in the first or second column.
        header_idx = None
        for i, row in df_raw.iterrows():
            row_str = [str(x) for x in list(row)]
            if any("No" in x or "No." in x for x in row_str):
                header_idx = i
                break
        
        f.write(f"\nDetected Header Row Index: {header_idx}\n")
        
        if header_idx is not None:
            # Re-read with correct header
            df = pd.read_excel(excel_path, sheet_name=sheet_name, skiprows=header_idx)
            f.write("\n=== CLEANED COLUMNS ===\n")
            f.write(str(df.columns.tolist()) + "\n")
            
            f.write("\n=== CLEANED DATA ===\n")
            # Drop rows that are completely empty or totals
            # Look at rows where No is present
            first_col = df.columns[0]
            # Convert No column to numeric if possible, to filter out totals
            df_filtered = df[pd.to_numeric(df[first_col], errors='coerce').notnull()]
            
            items = []
            for idx, row in df_filtered.iterrows():
                row_dict = row.to_dict()
                # Clean up dict keys and values
                clean_row = {}
                for k, v in row_dict.items():
                    k_str = str(k).strip()
                    # If value is float and nan, make it None
                    if pd.isna(v):
                        v_val = None
                    elif isinstance(v, float) and v.is_integer():
                        v_val = int(v)
                    else:
                        v_val = v
                    clean_row[k_str] = v_val
                items.append(clean_row)
                f.write(f"{clean_row}\n")
                
            # Write to JSON
            with open(output_json_path, "w", encoding="utf-8") as jf:
                json.dump(items, jf, ensure_ascii=False, indent=2)
                
            f.write(f"\nSaved {len(items)} items to {output_json_path}\n")
        else:
            f.write("\nError: Header row not found\n")

if __name__ == "__main__":
    analyze()

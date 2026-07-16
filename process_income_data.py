import pandas as pd
import json
import os
import datetime

excel_path = r"C:\Users\JO\Desktop\PAIK\data\income_0716.xlsx"
output_js_path = r"c:\Users\JO\Desktop\PAIK\income_data.js"

def parse_date(val):
    if pd.isna(val):
        return None
    try:
        # If it is numeric (Excel serial date)
        if isinstance(val, (int, float)) or (isinstance(val, str) and val.replace('.','',1).isdigit()):
            dt = pd.to_datetime(float(val), unit='D', origin='1899-12-30')
            return dt.strftime('%Y-%m-%d')
        # If it is a string datetime
        elif isinstance(val, str):
            dt = pd.to_datetime(val)
            return dt.strftime('%Y-%m-%d')
        # If it's already a timestamp/datetime
        elif hasattr(val, 'strftime'):
            return val.strftime('%Y-%m-%d')
    except Exception as e:
        print(f"Error parsing date {val}: {e}")
    return str(val)

def process_data():
    if not os.path.exists(excel_path):
        print(f"Error: {excel_path} not found.")
        return
        
    df = pd.read_excel(excel_path)
    
    # Identify cumulative start row (usually Row 0, which has '05-01~17 누적' in 비고)
    cumulative_row = df[df['비고'].astype(str).str.contains('누적', na=False)]
    
    cumulative_data = {}
    if not cumulative_row.empty:
        crow = cumulative_row.iloc[0]
        cumulative_data = {
            "date_label": "2026-05-01 ~ 2026-05-17",
            "hall_sales": int(crow['홀매출']),
            "baemin_delivery": int(crow['배민배달_금액']),
            "baemin_delivery_orders": int(crow['배민배달_건수']),
            "baemin_pickup": int(crow['배민픽업_금액']),
            "baemin_pickup_orders": int(crow['배민픽업_건수']),
            "coupang_eats": int(crow['쿠팡이츠_금액']),
            "coupang_eats_orders": int(crow['쿠팡이츠_건수']),
            "total_sales": int(crow['홀매출'] + crow['배민배달_금액'] + crow['배민픽업_금액'] + crow['쿠팡이츠_금액']),
            "remarks": str(crow['비고'])
        }
        
    # Filter out cumulative row for daily processing
    daily_df_raw = df[~df['비고'].astype(str).str.contains('누적', na=False)].copy()
    
    # Parse date column
    daily_df_raw['clean_date'] = daily_df_raw['날짜'].apply(parse_date)
    
    # Group by clean_date and sum
    grouped = daily_df_raw.groupby('clean_date').agg({
        '홀매출': 'sum',
        '배민배달_금액': 'sum',
        '배민배달_건수': 'sum',
        '배민픽업_금액': 'sum',
        '배민픽업_건수': 'sum',
        '쿠팡이츠_금액': 'sum',
        '쿠팡이츠_건수': 'sum'
    }).reset_index()
    
    # Sort chronologically
    grouped = grouped.sort_values('clean_date').reset_index(drop=True)
    
    daily_records = []
    
    # Loop and enrich
    for idx, row in grouped.iterrows():
        clean_date = row['clean_date']
        
        hall = int(row['홀매출'])
        bm_del = int(row['배민배달_금액'])
        bm_del_ord = int(row['배민배달_건수'])
        bm_pic = int(row['배민픽업_금액'])
        bm_pic_ord = int(row['배민픽업_건수'])
        cp_eats = int(row['쿠팡이츠_금액'])
        cp_eats_ord = int(row['쿠팡이츠_건수'])
        
        total = hall + bm_del + bm_pic + cp_eats
        deliv = bm_del + cp_eats
        pickup = bm_pic
        
        # Category breakdown (Coffee 50%, Smoothie 20%, Non-Coffee 18%, Bakery 12%)
        cat_coffee = int(total * 0.50)
        cat_smoothie = int(total * 0.20)
        cat_noncoffee = int(total * 0.18)
        cat_bakery = total - (cat_coffee + cat_smoothie + cat_noncoffee)
        
        # DoD comparison
        dod_change = 0
        dod_pct = 0.0
        if idx > 0:
            prev_total = daily_records[idx - 1]["total_sales"]
            dod_change = total - prev_total
            if prev_total > 0:
                dod_pct = round((dod_change / prev_total) * 100, 1)
                
        record = {
            "date": clean_date,
            "hall_sales": hall,
            "delivery_sales": deliv,
            "pickup_sales": pickup,
            "baemin_delivery": bm_del,
            "baemin_delivery_orders": bm_del_ord,
            "baemin_pickup": bm_pic,
            "baemin_pickup_orders": bm_pic_ord,
            "coupang_eats": cp_eats,
            "coupang_eats_orders": cp_eats_ord,
            "total_sales": total,
            "total_orders": bm_del_ord + bm_pic_ord + cp_eats_ord,
            "dod_change": dod_change,
            "dod_pct": dod_pct,
            "categories": {
                "coffee": cat_coffee,
                "smoothie": cat_smoothie,
                "non_coffee": cat_noncoffee,
                "bakery": cat_bakery
            }
        }
        daily_records.append(record)
        
    # Aggregate monthly stats
    # We will group by month ('YYYY-MM')
    monthly_data = {}
    
    # Also incorporate cumulative start into the May stats
    # The cumulative start covers May 1 to May 17.
    # Daily records start from May 18.
    
    for r in daily_records:
        month = r["date"][:7] # YYYY-MM
        if month not in monthly_data:
            monthly_data[month] = {
                "month": month,
                "total_sales": 0,
                "hall_sales": 0,
                "delivery_sales": 0,
                "pickup_sales": 0,
                "total_orders": 0,
                "days_count": 0
            }
        m_stat = monthly_data[month]
        m_stat["total_sales"] += r["total_sales"]
        m_stat["hall_sales"] += r["hall_sales"]
        m_stat["delivery_sales"] += r["delivery_sales"]
        m_stat["pickup_sales"] += r["pickup_sales"]
        m_stat["total_orders"] += r["total_orders"]
        m_stat["days_count"] += 1
        
    # Adjust May totals to include cumulative start
    if "2026-05" in monthly_data and cumulative_data:
        m_stat = monthly_data["2026-05"]
        m_stat["total_sales"] += cumulative_data["total_sales"]
        m_stat["hall_sales"] += cumulative_data["hall_sales"]
        m_stat["delivery_sales"] += cumulative_data["baemin_delivery"] + cumulative_data["coupang_eats"]
        m_stat["pickup_sales"] += cumulative_data["baemin_pickup"]
        m_stat["total_orders"] += cumulative_data["baemin_delivery_orders"] + cumulative_data["baemin_pickup_orders"] + cumulative_data["coupang_eats_orders"]
        m_stat["days_count"] += 17  # add 17 days
        
    monthly_summary = list(monthly_data.values())
    
    # Sort months chronologically
    monthly_summary = sorted(monthly_summary, key=lambda x: x["month"])
    
    # Compute MoM growth
    for idx, m in enumerate(monthly_summary):
        m["daily_avg_sales"] = int(m["total_sales"] / m["days_count"]) if m["days_count"] > 0 else 0
        mom_change = 0
        mom_pct = 0.0
        if idx > 0:
            prev_total = monthly_summary[idx - 1]["total_sales"]
            mom_change = m["total_sales"] - prev_total
            if prev_total > 0:
                mom_pct = round((mom_change / prev_total) * 100, 1)
        m["mom_change"] = mom_change
        m["mom_pct"] = mom_pct

    # Write output to Javascript file
    js_content = f"""// 광희's 빽다방 매출 분석 데이터베이스
const INCOME_CUMULATIVE_START = {json.dumps(cumulative_data, ensure_ascii=False, indent=2)};
const INCOME_DAILY_RECORDS = {json.dumps(daily_records, ensure_ascii=False, indent=2)};
const INCOME_MONTHLY_SUMMARY = {json.dumps(monthly_summary, ensure_ascii=False, indent=2)};
"""

    with open(output_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Successfully generated {output_js_path}!")
    print(f"Processed {len(daily_records)} daily records across {len(monthly_summary)} months.")

if __name__ == "__main__":
    process_data()

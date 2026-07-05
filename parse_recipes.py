import sqlite3
import pandas as pd
import os
import re

csv_items_path = r"C:\Users\JO\Desktop\PAIK\items_database.csv"
db_path = r"C:\Users\JO\Desktop\PAIK\items_database.db"
output_recipes_csv = r"C:\Users\JO\Desktop\PAIK\recipes_database.csv"
output_ingredients_csv = r"C:\Users\JO\Desktop\PAIK\recipe_ingredients_database.csv"

# Complete listing of core items that might be missing from invoice logs
additional_items = [
    {"품목명": "에스프레소 원두", "규격": "1KG", "단위": "EA", "단가": 16000, "과세구분": "과세", "원본품목명": "에스프레소 원두"},
    {"품목명": "서울우유", "규격": "1L", "단위": "EA", "단가": 2700, "과세구분": "면세", "원본품목명": "우유 [1L]"},
    {"품목명": "매일 연유", "규격": "1KG", "단위": "EA", "단가": 6200, "과세구분": "과세", "원본품목명": "연유"},
    {"품목명": "바리스타즈 휘핑 생크림", "규격": "1L", "단위": "EA", "단가": 7200, "과세구분": "과세", "원본품목명": "바리스타즈 휘핑"},
    {"품목명": "빽다방 초콜릿 소스", "규격": "2KG", "단위": "EA", "단가": 14000, "과세구분": "과세", "원본품목명": "초콜릿소스"},
    {"품목명": "탄산수", "규격": "350ML", "단위": "EA", "단가": 500, "과세구분": "과세", "원본품목명": "탄산수"},
    {"품목명": "코카콜라", "규격": "245ML", "단위": "EA", "단가": 800, "과세구분": "과세", "원본품목명": "코카콜라"},
    {"품목명": "죠리퐁", "규격": "150G", "단위": "EA", "단가": 1500, "과세구분": "과세", "원본품목명": "죠리퐁"},
    {"품목명": "멜론시럽", "규격": "1.5L", "단위": "EA", "단가": 11000, "과세구분": "과세", "원본품목명": "메론시럽"},
    {"품목명": "우롱티백", "규격": "1EA", "단위": "EA", "단가": 250, "과세구분": "과세", "원본품목명": "우롱티백"},
    {"품목명": "복숭아베이스", "규격": "1.5KG", "단위": "EA", "단가": 13500, "과세구분": "과세", "원본품목명": "복숭아 베이스"},
    {"품목명": "레몬베이스", "규격": "1.5KG", "단위": "EA", "단가": 12500, "과세구분": "과세", "원본품목명": "레몬베이스"},
    {"품목명": "유자퓨레", "규격": "1KG", "단위": "EA", "단가": 9500, "과세구분": "과세", "원본품목명": "유자 퓨레"},
    {"품목명": "깔라만시베이스", "규격": "1.5KG", "단위": "EA", "단가": 12000, "과세구분": "과세", "원본품목명": "깔라만시 베이스"},
    {"품목명": "쌍화차파우더", "규격": "1KG", "단위": "EA", "단가": 14500, "과세구분": "과세", "원본품목명": "쌍화차파우더"},
    {"품목명": "나타드코코", "규격": "1KG", "단위": "EA", "단가": 7800, "과세구분": "과세", "원본품목명": "나타드 코코"},
    {"품목명": "바나나소스", "규격": "1.5KG", "단위": "EA", "단가": 13500, "과세구분": "과세", "원본품목명": "바나나소스"},
    {"품목명": "흑당시럽", "규격": "1.5KG", "단위": "EA", "단가": 12500, "과세구분": "과세", "원본품목명": "흑당시럽"},
    {"품목명": "원조커피 원액", "규격": "1L", "단위": "EA", "단가": 9000, "과세구분": "과세", "원본품목명": "원조원액"},
    # Added missing ingredients
    {"품목명": "헤이즐넛 시럽", "규격": "1.5L", "단위": "EA", "단가": 12000, "과세구분": "과세", "원본품목명": "헤이즐넛시럽"},
    {"품목명": "사양벌꿀", "규격": "2KG", "단위": "EA", "단가": 16000, "과세구분": "과세", "원본품목명": "꿀"},
    {"품목명": "토스키 카라멜 소스", "규격": "2KG", "단위": "EA", "단가": 14000, "과세구분": "과세", "원본품목명": "카라멜소스"},
    {"품목명": "카라멜 드리즐", "규격": "1KG", "단위": "EA", "단가": 8000, "과세구분": "과세", "원본품목명": "카라멜드리즐"}
]

def parse_and_setup_recipes():
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
    
    # Ensure items table exists
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
    
    for item in additional_items:
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
            print(f"Added {len(new_items_added)} new core items to CSV database.")
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
        orig = str(row["원본품목명"]).strip()
        iid = str(row["품목ID"]).strip()
        item_id_map[name] = iid
        item_id_map[orig] = iid
        
    # Manual custom mapping rules
    custom_map = {
        "원두": "에스프레소 원두",
        "우유": "서울우유",
        "연유": "매일 연유",
        "생크림": "바리스타즈 휘핑 생크림",
        "초콜릿소스": "빽다방 초콜릿 소스",
        "초콜릿 소스": "빽다방 초콜릿 소스",
        "다크컬스 초콜릿": "도블라 컬스 미니 다크 초콜릿",
        "녹차파우더": "빽다방 말차파우더",
        "모카파우더": "빽다방 모카파우더",
        "바닐라파우더": "빽다방 바닐라향파우더",
        "요거트파우더": "빽다방 요거트파우더",
        "아이스티파우더": "립톤 아이스티 복숭아 920G",
        "시럽": "슈가 카페시럽",
        "밀크티베이스": "빽다방 밀크티베이스 1KG",
        "콜드브루커피원액": "빽다방 콜드브루 오리지널 커피원액 (에티오피아 100%)",
        "우롱티백": "우롱티백",
        "복숭아베이스": "복숭아베이스",
        "자몽베이스": "프룻스타 제로 레드자몽베이스",
        "레몬베이스": "레몬베이스",
        "깔라만시베이스": "깔라만시베이스",
        "유자퓨레": "유자퓨레",
        "쌍화차파우더": "쌍화차파우더",
        "나타드코코": "나타드코코",
        "바나나소스": "바나나소스",
        "흑당시럽": "흑당시럽",
        "원조원액": "원조커피 원액",
        "원조커피원액": "원조커피 원액",
        "타피오카펄": "타피오카펄",
        "오레오 분쇄쿠키": "오레오 분쇄쿠키",
        "냉동딸기": "빽쿡 냉동딸기",
        "냉동망고": "냉동 망고 1kg(솜)",
        "냉동블루베리": "빽쿡 냉동블루베리",
        "식혜원액": "명인이야기 식혜 농축액 1.2L",
        "미초원액": "쁘띠첼 미초 석류 900ml",
        "현미크런치": "당코팅 현미크런치",
        "체리파우더": "빽다방 체리파우더",
        "미숫가루": "빽다방 옛날미숫가루",
        "밀크파우더": "빽다방 밀크파우더",
        "초코브라우니": "초코브라우니",
        "헤이즐넛시럽": "헤이즐넛 시럽",
        "꿀": "사양벌꿀",
        "카라멜소스": "토스키 카라멜 소스",
        "카라멜드리즐": "카라멜 드리즐",
        "단팥": "콩고물빙수떡"
    }
    
    def get_item_id(ing_name):
        ing_clean = ing_name.strip()
        if ing_clean in custom_map:
            ing_clean = custom_map[ing_clean]
        if ing_clean in item_id_map:
            return item_id_map[ing_clean]
        for k, v in item_id_map.items():
            if ing_clean in k or k in ing_clean:
                return v
        return None

    # Recipes definitions
    recipes = [
        {"menu": "더블 에스프레소", "temp": "HOT", "ingredients": [("원두", 18.5, "g")]},
        {"menu": "원조커피", "temp": "HOT", "ingredients": [("원조커피원액", 150, "ml")]},
        {"menu": "원조커피", "temp": "ICED", "ingredients": [("원조커피원액", 125, "ml")]},
        {"menu": "아메리카노", "temp": "HOT", "ingredients": [("원두", 18.5, "g")]},
        {"menu": "아메리카노", "temp": "ICED", "ingredients": [("원두", 18.5, "g")]},
        {"menu": "헤이즐넛 아메리카노", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("헤이즐넛시럽", 30, "g")]},
        {"menu": "헤이즐넛 아메리카노", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("헤이즐넛시럽", 30, "g")]},
        {"menu": "꿀 아메리카노", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("꿀", 40, "g")]},
        {"menu": "꿀 아메리카노", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("꿀", 40, "g")]},
        {"menu": "카페라떼", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("생크림", 50, "ml"), ("우유", 200, "ml")]},
        {"menu": "카페라떼", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("우유", 250, "ml")]},
        {"menu": "디카페인 카페라떼", "temp": "ICED", "ingredients": [("우유", 225, "ml")]},
        {"menu": "헤이즐넛라떼", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("헤이즐넛시럽", 30, "g"), ("우유", 250, "ml")]},
        {"menu": "헤이즐넛라떼", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("헤이즐넛시럽", 30, "g"), ("우유", 250, "ml")]},
        {"menu": "카페모카", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("모카파우더", 39, "g"), ("우유", 250, "ml")]},
        {"menu": "카페모카", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("모카파우더", 39, "g"), ("우유", 250, "ml")]},
        {"menu": "카라멜 마키아또", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("카라멜소스", 50, "g"), ("우유", 250, "ml"), ("카라멜드리즐", 5, "g")]},
        {"menu": "카라멜 마키아또", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("카라멜소스", 50, "g"), ("우유", 250, "ml"), ("카라멜드리즐", 5, "g")]},
        {"menu": "바닐라라떼", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("바닐라파우더", 45, "g"), ("우유", 250, "ml")]},
        {"menu": "바닐라라떼", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("바닐라파우더", 45, "g"), ("우유", 250, "ml")]},
        {"menu": "달달연유라떼", "temp": "HOT", "ingredients": [("원두", 18.5, "g"), ("연유", 70, "g"), ("우유", 225, "ml")]},
        {"menu": "달달연유라떼", "temp": "ICED", "ingredients": [("원두", 18.5, "g"), ("연유", 70, "g"), ("우유", 225, "ml")]},
        {"menu": "초코라떼", "temp": "HOT", "ingredients": [("우유", 250, "ml"), ("초콜릿소스", 70, "g"), ("다크컬스 초콜릿", 5, "g")]},
        {"menu": "초코라떼", "temp": "ICED", "ingredients": [("우유", 250, "ml"), ("초콜릿소스", 70, "g")]},
        {"menu": "말차라떼", "temp": "HOT", "ingredients": [("녹차파우더", 51, "g"), ("우유", 250, "ml")]},
        {"menu": "말차라떼", "temp": "ICED", "ingredients": [("녹차파우더", 51, "g"), ("우유", 250, "ml")]},
        {"menu": "밀크티", "temp": "HOT", "ingredients": [("밀크티베이스", 100, "ml"), ("우유", 250, "ml")]},
        {"menu": "밀크티", "temp": "ICED", "ingredients": [("밀크티베이스", 100, "ml"), ("우유", 250, "ml")]},
        {"menu": "미숫가루", "temp": "ICED", "ingredients": [("미숫가루", 60, "g"), ("시럽", 60, "g")]},
        {"menu": "식혜", "temp": "ICED", "ingredients": [("식혜원액", 100, "ml")]},
        {"menu": "딸기라떼", "temp": "ICED", "ingredients": [("냉동딸기", 125, "g"), ("시럽", 20, "g"), ("우유", 200, "ml")]},
        {"menu": "딸기에이드", "temp": "ICED", "ingredients": [("냉동딸기", 125, "g"), ("시럽", 20, "g"), ("탄산수", 1, "캔")]},
        {"menu": "피치우롱 스위티", "temp": "HOT", "ingredients": [("복숭아베이스", 60, "g"), ("우롱티백", 0.6, "EA")]},
        {"menu": "피치우롱 스위티", "temp": "ICED", "ingredients": [("복숭아베이스", 60, "g"), ("우롱티백", 0.5, "EA")]},
        {"menu": "우롱티", "temp": "HOT", "ingredients": [("우롱티백", 0.8, "EA")]},
        {"menu": "우롱티", "temp": "ICED", "ingredients": [("우롱티백", 0.6, "EA")]},
        {"menu": "미초", "temp": "ICED", "ingredients": [("미초원액", 100, "ml")]},
        {"menu": "복숭아 아이스티", "temp": "ICED", "ingredients": [("아이스티파우더", 65, "g")]},
        {"menu": "아이스티 샷 추가 (아샷추)", "temp": "ICED", "ingredients": [("아이스티파우더", 65, "g"), ("원두", 9.25, "g")]},
        {"menu": "청포도플라워", "temp": "ICED", "ingredients": [("빽다방 청포도 플라워향 에이드", 100, "g")]},
        {"menu": "자몽티", "temp": "HOT", "ingredients": [("자몽베이스", 120, "g")]},
        {"menu": "자몽티", "temp": "ICED", "ingredients": [("자몽베이스", 120, "g")]},
        {"menu": "레몬티", "temp": "HOT", "ingredients": [("레몬베이스", 120, "g")]},
        {"menu": "레몬티", "temp": "ICED", "ingredients": [("레몬베이스", 120, "g")]},
        {"menu": "깔라만시티", "temp": "HOT", "ingredients": [("깔라만시베이스", 100, "g"), ("시럽", 20, "g")]},
        {"menu": "깔라만시티", "temp": "ICED", "ingredients": [("깔라만시베이스", 100, "g"), ("시럽", 20, "g")]},
        {"menu": "유자티", "temp": "HOT", "ingredients": [("유자퓨레", 120, "g")]},
        {"menu": "유자티", "temp": "ICED", "ingredients": [("유자퓨레", 120, "g")]},
        {"menu": "깔라만시에이드", "temp": "ICED", "ingredients": [("깔라만시베이스", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "청포도플라워 에이드", "temp": "ICED", "ingredients": [("빽다방 청포도 플라워향 에이드", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "자몽에이드", "temp": "ICED", "ingredients": [("자몽베이스", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "미초에이드", "temp": "ICED", "ingredients": [("미초원액", 100, "ml"), ("탄산수", 1, "캔")]},
        {"menu": "레모네이드", "temp": "ICED", "ingredients": [("레몬베이스", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "유자에이드", "temp": "ICED", "ingredients": [("유자퓨레", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "복숭아에이드", "temp": "ICED", "ingredients": [("복숭아베이스", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "체리콕콕", "temp": "ICED", "ingredients": [("체리파우더", 51, "g"), ("코카콜라", 1, "캔")]},
        {"menu": "멜론소다", "temp": "ICED", "ingredients": [("멜론시럽", 100, "g"), ("탄산수", 1, "캔")]},
        {"menu": "흑당버블라떼", "temp": "ICED", "ingredients": [("흑당시럽", 50, "g"), ("타피오카펄", 1, "봉"), ("우유", 250, "ml")]},
        {"menu": "흑당버블카페라떼", "temp": "ICED", "ingredients": [("흑당시럽", 50, "g"), ("타피오카펄", 1, "봉"), ("우유", 250, "ml"), ("원두", 9.25, "g")]},
        {"menu": "흑당버블밀크티", "temp": "ICED", "ingredients": [("흑당시럽", 30, "g"), ("타피오카펄", 1, "봉"), ("밀크티베이스", 50, "ml"), ("생크림", 50, "ml"), ("우유", 150, "ml")]},
        {"menu": "딸기요거트스무디", "temp": "ICED", "ingredients": [("우유", 200, "ml"), ("요거트파우더", 34, "g"), ("시럽", 50, "g"), ("냉동딸기", 100, "g")]},
        {"menu": "플레인요거트스무디", "temp": "ICED", "ingredients": [("우유", 200, "ml"), ("요거트파우더", 85, "g")]},
        {"menu": "블루베리요거트스무디", "temp": "ICED", "ingredients": [("우유", 250, "ml"), ("냉동블루베리", 150, "g"), ("요거트파우더", 34, "g"), ("시럽", 50, "g")]},
        {"menu": "밀크쉐이크", "temp": "ICED", "ingredients": [("우유", 200, "ml"), ("밀크파우더", 96, "g")]},
        {"menu": "아메리카노 (32oz)", "temp": "ICED", "ingredients": [("원두", 37, "g")]},
        {"menu": "카페라떼 (32oz)", "temp": "ICED", "ingredients": [("우유", 375, "ml"), ("원두", 37, "g")]},
        {"menu": "바닐라라떼 (32oz)", "temp": "ICED", "ingredients": [("우유", 375, "ml"), ("바닐라파우더", 75, "g"), ("원두", 37, "g")]},
        {"menu": "원조커피 (32oz)", "temp": "ICED", "ingredients": [("원조커피원액", 225, "ml")]},
        {"menu": "복숭아 아이스티 (32oz)", "temp": "ICED", "ingredients": [("아이스티파우더", 108, "g")]},
        {"menu": "아이스티 샷추가 (아샷추) (32oz)", "temp": "ICED", "ingredients": [("아이스티파우더", 86, "g"), ("원두", 18.5, "g")]},
        {"menu": "초코라떼 (32oz)", "temp": "ICED", "ingredients": [("우유", 375, "ml"), ("초콜릿소스", 120, "g")]},
        {"menu": "식혜 (32oz)", "temp": "ICED", "ingredients": [("식혜원액", 175, "ml")]},
        {"menu": "딸기라떼 (32oz)", "temp": "ICED", "ingredients": [("냉동딸기", 190, "g"), ("시럽", 30, "g"), ("우유", 300, "ml")]},
        {"menu": "미숫가루 (32oz)", "temp": "ICED", "ingredients": [("미숫가루", 80, "g"), ("시럽", 80, "g")]}
    ]

    # Create tables in SQLite
    cursor.execute("DROP TABLE IF EXISTS recipes")
    cursor.execute("DROP TABLE IF EXISTS recipe_ingredients")
    
    cursor.execute("""
    CREATE TABLE recipes (
        id TEXT PRIMARY KEY,
        menu_name TEXT NOT NULL,
        temperature TEXT NOT NULL,
        UNIQUE(menu_name, temperature)
    )
    """)
    
    cursor.execute("""
    CREATE TABLE recipe_ingredients (
        recipe_id TEXT NOT NULL,
        item_id TEXT NOT NULL,
        ingredient_name TEXT NOT NULL,
        amount REAL NOT NULL,
        unit TEXT NOT NULL,
        FOREIGN KEY(recipe_id) REFERENCES recipes(id),
        FOREIGN KEY(item_id) REFERENCES items(id)
    )
    """)
    
    recipes_rows = []
    ingredients_rows = []
    
    recipe_idx = 1
    for r in recipes:
        recipe_id = f"R{recipe_idx:04d}"
        recipes_rows.append({
            "레시피ID": recipe_id,
            "메뉴명": r["menu"],
            "구분": r["temp"]
        })
        
        cursor.execute("INSERT INTO recipes (id, menu_name, temperature) VALUES (?, ?, ?)",
                       (recipe_id, r["menu"], r["temp"]))
        
        for ing_name, amount, unit in r["ingredients"]:
            item_id = get_item_id(ing_name)
            if item_id is None:
                print(f"Warning: Could not resolve item ID for ingredient '{ing_name}' in recipe '{r['menu']} ({r['temp']})'")
                item_id = "UNKNOWN"
                
            ingredients_rows.append({
                "레시피ID": recipe_id,
                "품목ID": item_id,
                "레시피원료명": ing_name,
                "소모량": amount,
                "단위": unit
            })
            
            cursor.execute("INSERT INTO recipe_ingredients (recipe_id, item_id, ingredient_name, amount, unit) VALUES (?, ?, ?, ?, ?)",
                           (recipe_id, item_id, ing_name, amount, unit))
            
        recipe_idx += 1
        
    conn.commit()
    conn.close()
    
    # Save to CSV
    df_rec = pd.DataFrame(recipes_rows)
    df_rec.to_csv(output_recipes_csv, index=False, encoding="utf-8-sig")
    print(f"Saved {len(df_rec)} recipes to CSV: {output_recipes_csv}")
    
    df_ing = pd.DataFrame(ingredients_rows)
    df_ing.to_csv(output_ingredients_csv, index=False, encoding="utf-8-sig")
    print(f"Saved {len(df_ing)} recipe ingredients mapping to CSV: {output_ingredients_csv}")

if __name__ == "__main__":
    parse_and_setup_recipes()

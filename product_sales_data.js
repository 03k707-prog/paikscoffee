// 월간 상품별 매출 분석 데이터 (7월 누적)
const PRODUCT_SALES_RECORD = [
  {
    "rank": 1,
    "category": "커피",
    "name": "아메리카노(ICED)",
    "qty": 1266,
    "total_sales": 2564900,
    "dine_in": 328100,
    "take_out": 2066800,
    "delivery": 0
  },
  {
    "rank": 2,
    "category": "커피",
    "name": "바닐라라떼(ICED)",
    "qty": 222,
    "total_sales": 831400,
    "dine_in": 94200,
    "take_out": 689200,
    "delivery": 0
  },
  {
    "rank": 3,
    "category": "커피",
    "name": "빽사이즈 아메리카노(ICED)",
    "qty": 232,
    "total_sales": 775500,
    "dine_in": 37600,
    "take_out": 709900,
    "delivery": 0
  },
  {
    "rank": 4,
    "category": "커피",
    "name": "카페라떼(ICED)",
    "qty": 176,
    "total_sales": 576700,
    "dine_in": 60400,
    "take_out": 482300,
    "delivery": 0
  },
  {
    "rank": 5,
    "category": "점포행사/이벤트",
    "name": "[행사]요거트 아이스크림",
    "qty": 148,
    "total_sales": 492200,
    "dine_in": 172000,
    "take_out": 320200,
    "delivery": 0
  },
  {
    "rank": 6,
    "category": "주스 / 에이드",
    "name": "우리수박주스",
    "qty": 93,
    "total_sales": 375700,
    "dine_in": 81000,
    "take_out": 286700,
    "delivery": 0
  },
  {
    "rank": 7,
    "category": "커피",
    "name": "아이스티 샷추가(아.샷.추)",
    "qty": 102,
    "total_sales": 351600,
    "dine_in": 33800,
    "take_out": 305800,
    "delivery": 0
  },
  {
    "rank": 8,
    "category": "커피",
    "name": "달달연유라떼(ICED)",
    "qty": 63,
    "total_sales": 234300,
    "dine_in": 25900,
    "take_out": 204400,
    "delivery": 0
  },
  {
    "rank": 9,
    "category": "커피",
    "name": "원조커피(ICED)",
    "qty": 83,
    "total_sales": 212900,
    "dine_in": 20000,
    "take_out": 192900,
    "delivery": 0
  },
  {
    "rank": 10,
    "category": "차 / 흑당버블",
    "name": "복숭아 아이스티(ICED)",
    "qty": 73,
    "total_sales": 207400,
    "dine_in": 22400,
    "take_out": 185000,
    "delivery": 0
  },
  {
    "rank": 11,
    "category": "음료",
    "name": "미숫가루(우유)",
    "qty": 49,
    "total_sales": 197100,
    "dine_in": 46000,
    "take_out": 145100,
    "delivery": 0
  },
  {
    "rank": 12,
    "category": "커피",
    "name": "카페라떼(HOT)",
    "qty": 52,
    "total_sales": 168400,
    "dine_in": 28800,
    "take_out": 133600,
    "delivery": 0
  },
  {
    "rank": 13,
    "category": "커피",
    "name": "빽사이즈 아이스티 샷추가(아.샷.추)",
    "qty": 34,
    "total_sales": 153600,
    "dine_in": 0,
    "take_out": 147600,
    "delivery": 0
  },
  {
    "rank": 14,
    "category": "점포행사/이벤트",
    "name": "[행사]초코브라우니 요거트 아이스크림",
    "qty": 34,
    "total_sales": 151200,
    "dine_in": 62700,
    "take_out": 88500,
    "delivery": 0
  },
  {
    "rank": 15,
    "category": "커피",
    "name": "아메리카노(HOT)",
    "qty": 84,
    "total_sales": 144400,
    "dine_in": 45900,
    "take_out": 93400,
    "delivery": 0
  },
  {
    "rank": 16,
    "category": "커피",
    "name": "헤이즐넛아메리카노 (ICED)",
    "qty": 54,
    "total_sales": 135500,
    "dine_in": 25000,
    "take_out": 108500,
    "delivery": 0
  },
  {
    "rank": 17,
    "category": "점포행사/이벤트",
    "name": "[행사] 꿀초링 요거트 아이스크림",
    "qty": 25,
    "total_sales": 124000,
    "dine_in": 74000,
    "take_out": 50000,
    "delivery": 0
  },
  {
    "rank": 18,
    "category": "차 / 흑당버블",
    "name": "흑당버블밀크티",
    "qty": 25,
    "total_sales": 117900,
    "dine_in": 36800,
    "take_out": 79100,
    "delivery": 0
  },
  {
    "rank": 19,
    "category": "커피",
    "name": "생크림 카페라떼(ICED)",
    "qty": 25,
    "total_sales": 115300,
    "dine_in": 14700,
    "take_out": 98600,
    "delivery": 0
  },
  {
    "rank": 20,
    "category": "점포행사/이벤트",
    "name": "[행사]깨먹는 크런키 초코요거트 아이스크림",
    "qty": 23,
    "total_sales": 114200,
    "dine_in": 45600,
    "take_out": 68600,
    "delivery": 0
  },
  {
    "rank": 21,
    "category": "스무디 / 쉐이크",
    "name": "블루베리요거트스무디",
    "qty": 21,
    "total_sales": 111300,
    "dine_in": 21200,
    "take_out": 86100,
    "delivery": 0
  },
  {
    "rank": 22,
    "category": "주스 / 에이드",
    "name": "자몽에이드",
    "qty": 27,
    "total_sales": 109500,
    "dine_in": 35500,
    "take_out": 70000,
    "delivery": 0
  },
  {
    "rank": 23,
    "category": "음료",
    "name": "딸기라떼(ICED)",
    "qty": 28,
    "total_sales": 108800,
    "dine_in": 22800,
    "take_out": 86000,
    "delivery": 0
  },
  {
    "rank": 24,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "우리수박주스",
    "qty": 27,
    "total_sales": 108000,
    "dine_in": 28000,
    "take_out": 78000,
    "delivery": 0
  },
  {
    "rank": 25,
    "category": "저당",
    "name": "제로슈거 납작복숭아 아이스티",
    "qty": 35,
    "total_sales": 98600,
    "dine_in": 16800,
    "take_out": 79800,
    "delivery": 0
  },
  {
    "rank": 26,
    "category": "음료",
    "name": "말차라떼(ICED)",
    "qty": 25,
    "total_sales": 97300,
    "dine_in": 31600,
    "take_out": 65700,
    "delivery": 0
  },
  {
    "rank": 27,
    "category": "점포행사/이벤트",
    "name": "[행사] 망고치즈 요거트 아이스크림",
    "qty": 19,
    "total_sales": 94600,
    "dine_in": 29900,
    "take_out": 64700,
    "delivery": 0
  },
  {
    "rank": 28,
    "category": "점포행사/이벤트",
    "name": "[행사] 블루베리치즈 요거트 아이스크림",
    "qty": 19,
    "total_sales": 94600,
    "dine_in": 60300,
    "take_out": 34300,
    "delivery": 0
  },
  {
    "rank": 29,
    "category": "커피",
    "name": "디카페인 콜드브루(ICED)",
    "qty": 22,
    "total_sales": 88000,
    "dine_in": 40000,
    "take_out": 48000,
    "delivery": 0
  },
  {
    "rank": 30,
    "category": "디저트",
    "name": "소세지빵",
    "qty": 25,
    "total_sales": 87500,
    "dine_in": 31500,
    "take_out": 56000,
    "delivery": 0
  },
  {
    "rank": 31,
    "category": "빽스치노",
    "name": "원조빽스치노(베이직)",
    "qty": 26,
    "total_sales": 86400,
    "dine_in": 9900,
    "take_out": 70500,
    "delivery": 0
  },
  {
    "rank": 32,
    "category": "아이스크림",
    "name": "요거트 아이스크림",
    "qty": 23,
    "total_sales": 85500,
    "dine_in": 46500,
    "take_out": 39000,
    "delivery": 0
  },
  {
    "rank": 33,
    "category": "점포행사/이벤트",
    "name": "[행사]딸기콕콕 요거트 아이스크림",
    "qty": 21,
    "total_sales": 85000,
    "dine_in": 24000,
    "take_out": 61000,
    "delivery": 0
  },
  {
    "rank": 34,
    "category": "디저트",
    "name": "사라다빵",
    "qty": 24,
    "total_sales": 84000,
    "dine_in": 21000,
    "take_out": 63000,
    "delivery": 0
  },
  {
    "rank": 35,
    "category": "음료",
    "name": "미숫가루(두유)",
    "qty": 18,
    "total_sales": 82700,
    "dine_in": 13500,
    "take_out": 69200,
    "delivery": 0
  },
  {
    "rank": 36,
    "category": "커피",
    "name": "바닐라라떼(HOT)",
    "qty": 22,
    "total_sales": 82400,
    "dine_in": 22200,
    "take_out": 60200,
    "delivery": 0
  },
  {
    "rank": 37,
    "category": "주스 / 에이드",
    "name": "레모네이드",
    "qty": 20,
    "total_sales": 80500,
    "dine_in": 16000,
    "take_out": 64500,
    "delivery": 0
  },
  {
    "rank": 38,
    "category": "빽스치노",
    "name": "쿠키크런치빽스치노(베이직)",
    "qty": 20,
    "total_sales": 77700,
    "dine_in": 19500,
    "take_out": 58200,
    "delivery": 0
  },
  {
    "rank": 39,
    "category": "차 / 흑당버블",
    "name": "흑당버블라떼",
    "qty": 19,
    "total_sales": 76500,
    "dine_in": 16000,
    "take_out": 56500,
    "delivery": 0
  },
  {
    "rank": 40,
    "category": "음료",
    "name": "초코라떼(ICED)",
    "qty": 20,
    "total_sales": 75800,
    "dine_in": 29200,
    "take_out": 46600,
    "delivery": 0
  },
  {
    "rank": 41,
    "category": "커피",
    "name": "에어폼 아메리카노(ICED)",
    "qty": 34,
    "total_sales": 75400,
    "dine_in": 16000,
    "take_out": 57400,
    "delivery": 0
  },
  {
    "rank": 42,
    "category": "스무디 / 쉐이크",
    "name": "딸기요거트스무디",
    "qty": 17,
    "total_sales": 74300,
    "dine_in": 17200,
    "take_out": 57100,
    "delivery": 0
  },
  {
    "rank": 43,
    "category": "커피",
    "name": "빽사이즈 바닐라라떼",
    "qty": 11,
    "total_sales": 71500,
    "dine_in": 6500,
    "take_out": 65000,
    "delivery": 0
  },
  {
    "rank": 44,
    "category": "주스 / 에이드",
    "name": "망고주스",
    "qty": 18,
    "total_sales": 71100,
    "dine_in": 22800,
    "take_out": 48300,
    "delivery": 0
  },
  {
    "rank": 45,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "초코 컵빙수",
    "qty": 16,
    "total_sales": 70900,
    "dine_in": 22700,
    "take_out": 48200,
    "delivery": 0
  },
  {
    "rank": 46,
    "category": "스무디 / 쉐이크",
    "name": "밀크쉐이크",
    "qty": 20,
    "total_sales": 70500,
    "dine_in": 14500,
    "take_out": 56000,
    "delivery": 0
  },
  {
    "rank": 47,
    "category": "디저트",
    "name": "통단팥컵빙",
    "qty": 17,
    "total_sales": 69700,
    "dine_in": 25200,
    "take_out": 44500,
    "delivery": 0
  },
  {
    "rank": 48,
    "category": "커피",
    "name": "헤이즐넛라떼(ICED)",
    "qty": 18,
    "total_sales": 68900,
    "dine_in": 7400,
    "take_out": 61500,
    "delivery": 0
  },
  {
    "rank": 49,
    "category": "커피",
    "name": "빽사이즈 카페라떼",
    "qty": 14,
    "total_sales": 68700,
    "dine_in": 9600,
    "take_out": 59100,
    "delivery": 0
  },
  {
    "rank": 50,
    "category": "차 / 흑당버블",
    "name": "밀크티(ICED)",
    "qty": 19,
    "total_sales": 68200,
    "dine_in": 10500,
    "take_out": 57700,
    "delivery": 0
  },
  {
    "rank": 51,
    "category": "스무디 / 쉐이크",
    "name": "플레인요거트스무디",
    "qty": 19,
    "total_sales": 66500,
    "dine_in": 29500,
    "take_out": 35000,
    "delivery": 0
  },
  {
    "rank": 52,
    "category": "디저트",
    "name": "햄치즈 샌드위치",
    "qty": 20,
    "total_sales": 66000,
    "dine_in": 59400,
    "take_out": 6600,
    "delivery": 0
  },
  {
    "rank": 53,
    "category": "차 / 흑당버블",
    "name": "아이스티 망고 추가(아.망.추)",
    "qty": 15,
    "total_sales": 63700,
    "dine_in": 13900,
    "take_out": 49800,
    "delivery": 0
  },
  {
    "rank": 54,
    "category": "스무디 / 쉐이크",
    "name": "퐁당치노(미숫가루)",
    "qty": 15,
    "total_sales": 63500,
    "dine_in": 12600,
    "take_out": 44900,
    "delivery": 0
  },
  {
    "rank": 55,
    "category": "커피",
    "name": "빽사이즈 원조커피(ICED)",
    "qty": 18,
    "total_sales": 63000,
    "dine_in": 3500,
    "take_out": 59500,
    "delivery": 0
  },
  {
    "rank": 56,
    "category": "아이스크림",
    "name": "깨먹는 크런키 초코 요거트 아이스크림",
    "qty": 11,
    "total_sales": 60500,
    "dine_in": 38500,
    "take_out": 22000,
    "delivery": 0
  },
  {
    "rank": 57,
    "category": "커피",
    "name": "꿀 아메리카노(ICED)",
    "qty": 19,
    "total_sales": 57500,
    "dine_in": 15500,
    "take_out": 40000,
    "delivery": 0
  },
  {
    "rank": 58,
    "category": "디저트",
    "name": "빽그램핫도그",
    "qty": 13,
    "total_sales": 55900,
    "dine_in": 17200,
    "take_out": 38700,
    "delivery": 0
  },
  {
    "rank": 59,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "망고 컵빙수",
    "qty": 12,
    "total_sales": 53400,
    "dine_in": 14100,
    "take_out": 39300,
    "delivery": 0
  },
  {
    "rank": 60,
    "category": "디저트",
    "name": "고메버터 소금빵",
    "qty": 19,
    "total_sales": 53200,
    "dine_in": 11200,
    "take_out": 42000,
    "delivery": 0
  },
  {
    "rank": 61,
    "category": "커피",
    "name": "바나나카페라떼(ICED)",
    "qty": 12,
    "total_sales": 52400,
    "dine_in": 12300,
    "take_out": 40100,
    "delivery": 0
  },
  {
    "rank": 62,
    "category": "차 / 흑당버블",
    "name": "빽사이즈 복숭아아이스티(ICED)",
    "qty": 13,
    "total_sales": 51200,
    "dine_in": 7600,
    "take_out": 43600,
    "delivery": 0
  },
  {
    "rank": 63,
    "category": "배달_커피",
    "name": "바닐라라떼(ICED)",
    "qty": 12,
    "total_sales": 50400,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 48400
  },
  {
    "rank": 64,
    "category": "커피",
    "name": "생크림 아메리카노(ICED)",
    "qty": 15,
    "total_sales": 50100,
    "dine_in": 6600,
    "take_out": 41500,
    "delivery": 0
  },
  {
    "rank": 65,
    "category": "커피",
    "name": "디카페인 콜드브루라떼(ICED)",
    "qty": 11,
    "total_sales": 50000,
    "dine_in": 18000,
    "take_out": 32000,
    "delivery": 0
  },
  {
    "rank": 66,
    "category": "주스 / 에이드",
    "name": "제주감귤주스",
    "qty": 13,
    "total_sales": 49400,
    "dine_in": 7600,
    "take_out": 41800,
    "delivery": 0
  },
  {
    "rank": 67,
    "category": "주스 / 에이드",
    "name": "딸기주스",
    "qty": 11,
    "total_sales": 48500,
    "dine_in": 12900,
    "take_out": 35600,
    "delivery": 0
  },
  {
    "rank": 68,
    "category": "커피",
    "name": "제로슈거 납작복숭아 아.샷.추",
    "qty": 14,
    "total_sales": 48100,
    "dine_in": 7300,
    "take_out": 40800,
    "delivery": 0
  },
  {
    "rank": 69,
    "category": "음료",
    "name": "말차크림라떼(ICED)",
    "qty": 11,
    "total_sales": 47800,
    "dine_in": 8600,
    "take_out": 39200,
    "delivery": 0
  },
  {
    "rank": 70,
    "category": "커피",
    "name": "콜드브루라떼(ICED)",
    "qty": 9,
    "total_sales": 47500,
    "dine_in": 5500,
    "take_out": 38000,
    "delivery": 0
  },
  {
    "rank": 71,
    "category": "커피",
    "name": "카라멜마키아또 (ICED)",
    "qty": 12,
    "total_sales": 46600,
    "dine_in": 7400,
    "take_out": 39200,
    "delivery": 0
  },
  {
    "rank": 72,
    "category": "점포행사/이벤트",
    "name": "[행사]우베 요거트 아이스크림",
    "qty": 11,
    "total_sales": 46200,
    "dine_in": 16800,
    "take_out": 29400,
    "delivery": 0
  },
  {
    "rank": 73,
    "category": "주스 / 에이드",
    "name": "토마토주스",
    "qty": 11,
    "total_sales": 44000,
    "dine_in": 16000,
    "take_out": 26000,
    "delivery": 0
  },
  {
    "rank": 74,
    "category": "음료",
    "name": "식혜",
    "qty": 16,
    "total_sales": 43200,
    "dine_in": 10800,
    "take_out": 30400,
    "delivery": 0
  },
  {
    "rank": 75,
    "category": "스무디 / 쉐이크",
    "name": "깨먹는 크런키 초코스무디",
    "qty": 9,
    "total_sales": 43200,
    "dine_in": 9600,
    "take_out": 33600,
    "delivery": 0
  },
  {
    "rank": 76,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "원조커피크림 미숫가루(ICED)",
    "qty": 9,
    "total_sales": 40500,
    "dine_in": 9000,
    "take_out": 27500,
    "delivery": 0
  },
  {
    "rank": 77,
    "category": "주스 / 에이드",
    "name": "딸기에이드",
    "qty": 10,
    "total_sales": 39500,
    "dine_in": 7600,
    "take_out": 31900,
    "delivery": 0
  },
  {
    "rank": 78,
    "category": "커피",
    "name": "콜드브루 연유라떼(ICED)",
    "qty": 7,
    "total_sales": 38500,
    "dine_in": 5500,
    "take_out": 33000,
    "delivery": 0
  },
  {
    "rank": 79,
    "category": "주스 / 에이드",
    "name": "체리콕콕",
    "qty": 11,
    "total_sales": 38500,
    "dine_in": 24500,
    "take_out": 14000,
    "delivery": 0
  },
  {
    "rank": 80,
    "category": "주스 / 에이드",
    "name": "레드불 에이드",
    "qty": 8,
    "total_sales": 38400,
    "dine_in": 9600,
    "take_out": 26800,
    "delivery": 0
  },
  {
    "rank": 81,
    "category": "음료",
    "name": "아이스미초 (석류)",
    "qty": 15,
    "total_sales": 38000,
    "dine_in": 15500,
    "take_out": 20500,
    "delivery": 0
  },
  {
    "rank": 82,
    "category": "주스 / 에이드",
    "name": "깔라만시에이드",
    "qty": 10,
    "total_sales": 38000,
    "dine_in": 7600,
    "take_out": 30400,
    "delivery": 0
  },
  {
    "rank": 83,
    "category": "스무디 / 쉐이크",
    "name": "통단팥율무쉐이크",
    "qty": 8,
    "total_sales": 37600,
    "dine_in": 14100,
    "take_out": 23500,
    "delivery": 0
  },
  {
    "rank": 84,
    "category": "차 / 흑당버블",
    "name": "피치우롱스위티(ICED)",
    "qty": 11,
    "total_sales": 37500,
    "dine_in": 21000,
    "take_out": 16500,
    "delivery": 0
  },
  {
    "rank": 85,
    "category": "빽스치노",
    "name": "딸기바나나빽스치노(베이직)",
    "qty": 9,
    "total_sales": 37200,
    "dine_in": 9200,
    "take_out": 28000,
    "delivery": 0
  },
  {
    "rank": 86,
    "category": "주스 / 에이드",
    "name": "미초(석류)에이드",
    "qty": 12,
    "total_sales": 36000,
    "dine_in": 18000,
    "take_out": 18000,
    "delivery": 0
  },
  {
    "rank": 87,
    "category": "음료",
    "name": "우베라떼(ICED)",
    "qty": 10,
    "total_sales": 35000,
    "dine_in": 8500,
    "take_out": 24500,
    "delivery": 0
  },
  {
    "rank": 88,
    "category": "빽스치노",
    "name": "초코빽스치노(베이직)",
    "qty": 9,
    "total_sales": 34700,
    "dine_in": 0,
    "take_out": 34700,
    "delivery": 0
  },
  {
    "rank": 89,
    "category": "스무디 / 쉐이크",
    "name": "망고스무디",
    "qty": 9,
    "total_sales": 34700,
    "dine_in": 7600,
    "take_out": 27100,
    "delivery": 0
  },
  {
    "rank": 90,
    "category": "주스 / 에이드",
    "name": "청포도에이드",
    "qty": 8,
    "total_sales": 33200,
    "dine_in": 0,
    "take_out": 33200,
    "delivery": 0
  },
  {
    "rank": 91,
    "category": "빽스치노",
    "name": "딸기빽스치노(베이직)",
    "qty": 8,
    "total_sales": 33200,
    "dine_in": 9200,
    "take_out": 24000,
    "delivery": 0
  },
  {
    "rank": 92,
    "category": "스무디 / 쉐이크",
    "name": "딸기앤쿠키 쉐이크",
    "qty": 8,
    "total_sales": 32400,
    "dine_in": 0,
    "take_out": 32400,
    "delivery": 0
  },
  {
    "rank": 93,
    "category": "음료",
    "name": "율무아몬드라떼(ICED)",
    "qty": 8,
    "total_sales": 30900,
    "dine_in": 11400,
    "take_out": 19500,
    "delivery": 0
  },
  {
    "rank": 94,
    "category": "점포행사/이벤트",
    "name": "[행사]말차 요거트 아이스크림",
    "qty": 8,
    "total_sales": 30400,
    "dine_in": 11400,
    "take_out": 19000,
    "delivery": 0
  },
  {
    "rank": 95,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "블루베리 컵빙수",
    "qty": 7,
    "total_sales": 30400,
    "dine_in": 21000,
    "take_out": 9400,
    "delivery": 0
  },
  {
    "rank": 96,
    "category": "아이스크림",
    "name": "꿀초링 요거트 아이스크림",
    "qty": 5,
    "total_sales": 30000,
    "dine_in": 12000,
    "take_out": 18000,
    "delivery": 0
  },
  {
    "rank": 97,
    "category": "커피",
    "name": "피스타치오 생크림 카페라떼(ICED)",
    "qty": 6,
    "total_sales": 28800,
    "dine_in": 4800,
    "take_out": 24000,
    "delivery": 0
  },
  {
    "rank": 98,
    "category": "저당",
    "name": "제로슈거 레모네이드",
    "qty": 7,
    "total_sales": 28000,
    "dine_in": 8000,
    "take_out": 18000,
    "delivery": 0
  },
  {
    "rank": 99,
    "category": "커피",
    "name": "원조커피크림 라떼(ICED)",
    "qty": 6,
    "total_sales": 27600,
    "dine_in": 5100,
    "take_out": 22500,
    "delivery": 0
  },
  {
    "rank": 100,
    "category": "커피",
    "name": "카페모카(ICED)",
    "qty": 7,
    "total_sales": 27300,
    "dine_in": 3900,
    "take_out": 21400,
    "delivery": 0
  },
  {
    "rank": 101,
    "category": "음료",
    "name": "빽사이즈 식혜",
    "qty": 6,
    "total_sales": 25800,
    "dine_in": 4300,
    "take_out": 21500,
    "delivery": 0
  },
  {
    "rank": 102,
    "category": "음료",
    "name": "깨먹는 크런키 초코라떼(ICED)",
    "qty": 6,
    "total_sales": 25800,
    "dine_in": 17200,
    "take_out": 8600,
    "delivery": 0
  },
  {
    "rank": 103,
    "category": "음료",
    "name": "빽사이즈 미숫가루(우유)",
    "qty": 5,
    "total_sales": 25500,
    "dine_in": 0,
    "take_out": 25500,
    "delivery": 0
  },
  {
    "rank": 104,
    "category": "스무디 / 쉐이크",
    "name": "프로틴쉐이크 초코",
    "qty": 5,
    "total_sales": 25000,
    "dine_in": 5000,
    "take_out": 20000,
    "delivery": 0
  },
  {
    "rank": 105,
    "category": "음료",
    "name": "수정과(ICED)",
    "qty": 9,
    "total_sales": 24300,
    "dine_in": 5400,
    "take_out": 18900,
    "delivery": 0
  },
  {
    "rank": 106,
    "category": "주스 / 에이드",
    "name": "복숭아에이드",
    "qty": 6,
    "total_sales": 24000,
    "dine_in": 12000,
    "take_out": 12000,
    "delivery": 0
  },
  {
    "rank": 107,
    "category": "커피",
    "name": "크리미콜드브루 바닐라",
    "qty": 5,
    "total_sales": 24000,
    "dine_in": 0,
    "take_out": 24000,
    "delivery": 0
  },
  {
    "rank": 108,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "토마토주스",
    "qty": 6,
    "total_sales": 24000,
    "dine_in": 8000,
    "take_out": 16000,
    "delivery": 0
  },
  {
    "rank": 109,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "우베라떼(ICED)",
    "qty": 6,
    "total_sales": 23400,
    "dine_in": 0,
    "take_out": 23400,
    "delivery": 0
  },
  {
    "rank": 110,
    "category": "차 / 흑당버블",
    "name": "흑당버블카페라떼",
    "qty": 5,
    "total_sales": 23000,
    "dine_in": 0,
    "take_out": 21000,
    "delivery": 0
  },
  {
    "rank": 111,
    "category": "음료",
    "name": "미숫가루(물)",
    "qty": 7,
    "total_sales": 22500,
    "dine_in": 6000,
    "take_out": 16500,
    "delivery": 0
  },
  {
    "rank": 112,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "원조커피크림 라떼(ICED)",
    "qty": 5,
    "total_sales": 22500,
    "dine_in": 0,
    "take_out": 22500,
    "delivery": 0
  },
  {
    "rank": 113,
    "category": "커피",
    "name": "원조커피크림 미숫가루(ICED)",
    "qty": 5,
    "total_sales": 22500,
    "dine_in": 4500,
    "take_out": 16000,
    "delivery": 0
  },
  {
    "rank": 114,
    "category": "차 / 흑당버블",
    "name": "쌍화차(HOT)",
    "qty": 7,
    "total_sales": 21000,
    "dine_in": 21000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 115,
    "category": "MD 상품",
    "name": "[MD] 캐치티니핑 유기농 보리차",
    "qty": 14,
    "total_sales": 21000,
    "dine_in": 10500,
    "take_out": 10500,
    "delivery": 0
  },
  {
    "rank": 116,
    "category": "저당",
    "name": "제로슈거 자몽티(ICED)",
    "qty": 6,
    "total_sales": 21000,
    "dine_in": 3500,
    "take_out": 17500,
    "delivery": 0
  },
  {
    "rank": 117,
    "category": "주스 / 에이드",
    "name": "유자에이드",
    "qty": 5,
    "total_sales": 20000,
    "dine_in": 0,
    "take_out": 20000,
    "delivery": 0
  },
  {
    "rank": 118,
    "category": "빽스치노",
    "name": "초코바나나빽스치노(베이직)",
    "qty": 5,
    "total_sales": 20000,
    "dine_in": 0,
    "take_out": 20000,
    "delivery": 0
  },
  {
    "rank": 119,
    "category": "빽스치노",
    "name": "말차빽스치노(베이직)",
    "qty": 5,
    "total_sales": 20000,
    "dine_in": 4000,
    "take_out": 16000,
    "delivery": 0
  },
  {
    "rank": 120,
    "category": "저당",
    "name": "제로슈거 자몽에이드",
    "qty": 5,
    "total_sales": 20000,
    "dine_in": 4000,
    "take_out": 14000,
    "delivery": 0
  },
  {
    "rank": 121,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "파인애플주스",
    "qty": 5,
    "total_sales": 19500,
    "dine_in": 3800,
    "take_out": 15700,
    "delivery": 0
  },
  {
    "rank": 122,
    "category": "커피",
    "name": "디카페인 크리미콜드브루 바닐라",
    "qty": 4,
    "total_sales": 19200,
    "dine_in": 14400,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 123,
    "category": "아이스크림",
    "name": "초코브라우니 요거트 아이스크림",
    "qty": 4,
    "total_sales": 19200,
    "dine_in": 9600,
    "take_out": 9600,
    "delivery": 0
  },
  {
    "rank": 124,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "생크림 우베라떼(ICED)",
    "qty": 4,
    "total_sales": 19200,
    "dine_in": 0,
    "take_out": 19200,
    "delivery": 0
  },
  {
    "rank": 125,
    "category": "커피",
    "name": "챔피언스 유자셔벗 아메리카노(ICED)",
    "qty": 4,
    "total_sales": 18800,
    "dine_in": 0,
    "take_out": 18800,
    "delivery": 0
  },
  {
    "rank": 126,
    "category": "아이스크림",
    "name": "블루베리치즈 요거트 아이스크림",
    "qty": 3,
    "total_sales": 18000,
    "dine_in": 0,
    "take_out": 18000,
    "delivery": 0
  },
  {
    "rank": 127,
    "category": "아이스크림",
    "name": "딸기콕콕 요거트 아이스크림",
    "qty": 4,
    "total_sales": 18000,
    "dine_in": 9000,
    "take_out": 9000,
    "delivery": 0
  },
  {
    "rank": 128,
    "category": "음료",
    "name": "청포도플라워",
    "qty": 5,
    "total_sales": 17500,
    "dine_in": 3500,
    "take_out": 14000,
    "delivery": 0
  },
  {
    "rank": 129,
    "category": "차 / 흑당버블",
    "name": "황금캐모마일티(ICED)",
    "qty": 7,
    "total_sales": 17500,
    "dine_in": 2500,
    "take_out": 15000,
    "delivery": 0
  },
  {
    "rank": 130,
    "category": "디저트",
    "name": "망고 컵빙수",
    "qty": 4,
    "total_sales": 17300,
    "dine_in": 8900,
    "take_out": 8400,
    "delivery": 0
  },
  {
    "rank": 131,
    "category": "점포행사/이벤트",
    "name": "[행사]말차쿠키 요거트 아이스크림",
    "qty": 4,
    "total_sales": 17200,
    "dine_in": 4300,
    "take_out": 12900,
    "delivery": 0
  },
  {
    "rank": 132,
    "category": "커피",
    "name": "디카페인 콜드브루 연유라떼 (ICED)",
    "qty": 3,
    "total_sales": 17000,
    "dine_in": 0,
    "take_out": 17000,
    "delivery": 0
  },
  {
    "rank": 133,
    "category": "디저트",
    "name": "크룽지",
    "qty": 6,
    "total_sales": 16800,
    "dine_in": 14000,
    "take_out": 2800,
    "delivery": 0
  },
  {
    "rank": 134,
    "category": "음료",
    "name": "율무라떼(ICED)",
    "qty": 5,
    "total_sales": 16500,
    "dine_in": 3300,
    "take_out": 13200,
    "delivery": 0
  },
  {
    "rank": 135,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "챔피언스 유자 아메리카노(ICED)",
    "qty": 4,
    "total_sales": 16000,
    "dine_in": 4000,
    "take_out": 12000,
    "delivery": 0
  },
  {
    "rank": 136,
    "category": "커피",
    "name": "챔피언스 유자 아메리카노(ICED)",
    "qty": 4,
    "total_sales": 16000,
    "dine_in": 8000,
    "take_out": 8000,
    "delivery": 0
  },
  {
    "rank": 137,
    "category": "차 / 흑당버블",
    "name": "레몬얼그레이티(ICED)",
    "qty": 4,
    "total_sales": 15200,
    "dine_in": 8200,
    "take_out": 7000,
    "delivery": 0
  },
  {
    "rank": 138,
    "category": "스무디 / 쉐이크",
    "name": "퐁당치노(바닐라)",
    "qty": 4,
    "total_sales": 15200,
    "dine_in": 0,
    "take_out": 15200,
    "delivery": 0
  },
  {
    "rank": 139,
    "category": "디저트",
    "name": "레드핫 소세지빵",
    "qty": 4,
    "total_sales": 15200,
    "dine_in": 7600,
    "take_out": 7600,
    "delivery": 0
  },
  {
    "rank": 140,
    "category": "차 / 흑당버블",
    "name": "페퍼민트티(ICED)",
    "qty": 6,
    "total_sales": 15000,
    "dine_in": 5000,
    "take_out": 10000,
    "delivery": 0
  },
  {
    "rank": 141,
    "category": "주스 / 에이드",
    "name": "블루베리주스",
    "qty": 3,
    "total_sales": 14900,
    "dine_in": 0,
    "take_out": 14900,
    "delivery": 0
  },
  {
    "rank": 142,
    "category": "스무디 / 쉐이크",
    "name": "냥냥! 춘배펀치 딸기스무디",
    "qty": 3,
    "total_sales": 14400,
    "dine_in": 0,
    "take_out": 14400,
    "delivery": 0
  },
  {
    "rank": 143,
    "category": "빽스치노",
    "name": "바닐라커피 빽스치노(베이직)",
    "qty": 3,
    "total_sales": 14400,
    "dine_in": 0,
    "take_out": 14400,
    "delivery": 0
  },
  {
    "rank": 144,
    "category": "스무디 / 쉐이크",
    "name": "통단팥쉐이크",
    "qty": 3,
    "total_sales": 14100,
    "dine_in": 0,
    "take_out": 14100,
    "delivery": 0
  },
  {
    "rank": 145,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "챔피언스 유자셔벗 아메리카노(ICED)",
    "qty": 3,
    "total_sales": 14100,
    "dine_in": 4700,
    "take_out": 9400,
    "delivery": 0
  },
  {
    "rank": 146,
    "category": "차 / 흑당버블",
    "name": "유자티(ICED)",
    "qty": 4,
    "total_sales": 14000,
    "dine_in": 3500,
    "take_out": 8500,
    "delivery": 0
  },
  {
    "rank": 147,
    "category": "차 / 흑당버블",
    "name": "오렌지자몽블랙티(ICED)",
    "qty": 4,
    "total_sales": 14000,
    "dine_in": 0,
    "take_out": 14000,
    "delivery": 0
  },
  {
    "rank": 148,
    "category": "디저트",
    "name": "긴페스츄리와플",
    "qty": 4,
    "total_sales": 14000,
    "dine_in": 3500,
    "take_out": 10500,
    "delivery": 0
  },
  {
    "rank": 149,
    "category": "MD 상품",
    "name": "[MD] 빽다방 보틀 텀블러(750ml)",
    "qty": 1,
    "total_sales": 14000,
    "dine_in": 14000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 150,
    "category": "커피",
    "name": "아이스티 샷. 망고 추가 (아.샷.망.추)",
    "qty": 3,
    "total_sales": 13800,
    "dine_in": 0,
    "take_out": 13800,
    "delivery": 0
  },
  {
    "rank": 151,
    "category": "디저트",
    "name": "레드핫 빽그램핫도그",
    "qty": 3,
    "total_sales": 13800,
    "dine_in": 4600,
    "take_out": 9200,
    "delivery": 0
  },
  {
    "rank": 152,
    "category": "빽스치노",
    "name": "피스타치오빽스치노(베이직)",
    "qty": 3,
    "total_sales": 13500,
    "dine_in": 4500,
    "take_out": 9000,
    "delivery": 0
  },
  {
    "rank": 153,
    "category": "아이스크림",
    "name": "우베 요거트 아이스크림",
    "qty": 3,
    "total_sales": 13500,
    "dine_in": 0,
    "take_out": 13500,
    "delivery": 0
  },
  {
    "rank": 154,
    "category": "스무디 / 쉐이크",
    "name": "바나나밀크쉐이크",
    "qty": 3,
    "total_sales": 12900,
    "dine_in": 0,
    "take_out": 12900,
    "delivery": 0
  },
  {
    "rank": 155,
    "category": "음료",
    "name": "빽사이즈 미숫가루(물)",
    "qty": 3,
    "total_sales": 12500,
    "dine_in": 8000,
    "take_out": 4500,
    "delivery": 0
  },
  {
    "rank": 156,
    "category": "MD 상품",
    "name": "[MD] 빽다방 보틀 텀블러(500ml)",
    "qty": 1,
    "total_sales": 12500,
    "dine_in": 12500,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 157,
    "category": "커피",
    "name": "콜드브루(ICED)",
    "qty": 3,
    "total_sales": 12000,
    "dine_in": 4000,
    "take_out": 8000,
    "delivery": 0
  },
  {
    "rank": 158,
    "category": "스무디 / 쉐이크",
    "name": "퐁당치노(원조커피)",
    "qty": 3,
    "total_sales": 11900,
    "dine_in": 0,
    "take_out": 11900,
    "delivery": 0
  },
  {
    "rank": 159,
    "category": "음료",
    "name": "말차라떼(HOT)",
    "qty": 3,
    "total_sales": 11400,
    "dine_in": 7600,
    "take_out": 3800,
    "delivery": 0
  },
  {
    "rank": 160,
    "category": "주스 / 에이드",
    "name": "파인애플주스",
    "qty": 3,
    "total_sales": 11400,
    "dine_in": 3800,
    "take_out": 7600,
    "delivery": 0
  },
  {
    "rank": 161,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "홀릭 바움쿠헨 세트(ICED)",
    "qty": 2,
    "total_sales": 11400,
    "dine_in": 0,
    "take_out": 9400,
    "delivery": 0
  },
  {
    "rank": 162,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "초코츄러스 쫀득볼(3ea)",
    "qty": 4,
    "total_sales": 11200,
    "dine_in": 0,
    "take_out": 11200,
    "delivery": 0
  },
  {
    "rank": 163,
    "category": "스무디 / 쉐이크",
    "name": "말차크림망고스무디",
    "qty": 2,
    "total_sales": 10600,
    "dine_in": 0,
    "take_out": 10600,
    "delivery": 0
  },
  {
    "rank": 164,
    "category": "차 / 흑당버블",
    "name": "자몽티(ICED)",
    "qty": 3,
    "total_sales": 10500,
    "dine_in": 0,
    "take_out": 10500,
    "delivery": 0
  },
  {
    "rank": 165,
    "category": "차 / 흑당버블",
    "name": "오렌지자몽블랙티(HOT)",
    "qty": 3,
    "total_sales": 10500,
    "dine_in": 0,
    "take_out": 10500,
    "delivery": 0
  },
  {
    "rank": 166,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "냥냥! 춘배펀치 딸기스무디",
    "qty": 2,
    "total_sales": 10100,
    "dine_in": 5300,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 167,
    "category": "차 / 흑당버블",
    "name": "황금캐모마일티(HOT)",
    "qty": 4,
    "total_sales": 10000,
    "dine_in": 10000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 168,
    "category": "디저트",
    "name": "마카롱(딸기크런치)",
    "qty": 4,
    "total_sales": 10000,
    "dine_in": 7500,
    "take_out": 2500,
    "delivery": 0
  },
  {
    "rank": 169,
    "category": "스무디 / 쉐이크",
    "name": "바나나커피쉐이크",
    "qty": 2,
    "total_sales": 9800,
    "dine_in": 0,
    "take_out": 9800,
    "delivery": 0
  },
  {
    "rank": 170,
    "category": "커피",
    "name": "레드불 꿀샷추",
    "qty": 2,
    "total_sales": 9600,
    "dine_in": 4800,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 171,
    "category": "커피",
    "name": "디카페인 콜드브루라떼(HOT)",
    "qty": 2,
    "total_sales": 9500,
    "dine_in": 5000,
    "take_out": 4500,
    "delivery": 0
  },
  {
    "rank": 172,
    "category": "디저트",
    "name": "쫀득 감자빵",
    "qty": 3,
    "total_sales": 9000,
    "dine_in": 3000,
    "take_out": 6000,
    "delivery": 0
  },
  {
    "rank": 173,
    "category": "디저트",
    "name": "쫀득 고구마빵",
    "qty": 3,
    "total_sales": 9000,
    "dine_in": 0,
    "take_out": 9000,
    "delivery": 0
  },
  {
    "rank": 174,
    "category": "아이스크림",
    "name": "말차 요거트 아이스크림",
    "qty": 2,
    "total_sales": 8600,
    "dine_in": 0,
    "take_out": 8600,
    "delivery": 0
  },
  {
    "rank": 175,
    "category": "디저트",
    "name": "블루베리 컵빙수",
    "qty": 2,
    "total_sales": 8400,
    "dine_in": 4200,
    "take_out": 4200,
    "delivery": 0
  },
  {
    "rank": 176,
    "category": "빽스치노",
    "name": "바닐라 빽스치노(베이직)",
    "qty": 2,
    "total_sales": 8000,
    "dine_in": 0,
    "take_out": 8000,
    "delivery": 0
  },
  {
    "rank": 177,
    "category": "음료",
    "name": "바나나라떼(ICED)",
    "qty": 2,
    "total_sales": 7500,
    "dine_in": 0,
    "take_out": 7500,
    "delivery": 0
  },
  {
    "rank": 178,
    "category": "디저트",
    "name": "마카롱(순우유)",
    "qty": 3,
    "total_sales": 7500,
    "dine_in": 0,
    "take_out": 7500,
    "delivery": 0
  },
  {
    "rank": 179,
    "category": "배달_커피",
    "name": "아메리카노(ICED)",
    "qty": 3,
    "total_sales": 7500,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 7500
  },
  {
    "rank": 180,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "커스터드홀릭 바움쿠헨",
    "qty": 3,
    "total_sales": 7500,
    "dine_in": 2500,
    "take_out": 5000,
    "delivery": 0
  },
  {
    "rank": 181,
    "category": "커피",
    "name": "카라멜마키아또 (HOT)",
    "qty": 2,
    "total_sales": 7400,
    "dine_in": 0,
    "take_out": 7400,
    "delivery": 0
  },
  {
    "rank": 182,
    "category": "차 / 흑당버블",
    "name": "레몬티(ICED)",
    "qty": 2,
    "total_sales": 7000,
    "dine_in": 3500,
    "take_out": 3500,
    "delivery": 0
  },
  {
    "rank": 183,
    "category": "차 / 흑당버블",
    "name": "자몽티(HOT)",
    "qty": 2,
    "total_sales": 7000,
    "dine_in": 7000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 184,
    "category": "차 / 흑당버블",
    "name": "유자티(HOT)",
    "qty": 2,
    "total_sales": 7000,
    "dine_in": 3500,
    "take_out": 3500,
    "delivery": 0
  },
  {
    "rank": 185,
    "category": "아이스크림",
    "name": "망고치즈 요거트 아이스크림",
    "qty": 1,
    "total_sales": 7000,
    "dine_in": 0,
    "take_out": 7000,
    "delivery": 0
  },
  {
    "rank": 186,
    "category": "저당",
    "name": "제로슈거 레몬티(ICED)",
    "qty": 2,
    "total_sales": 7000,
    "dine_in": 3500,
    "take_out": 3500,
    "delivery": 0
  },
  {
    "rank": 187,
    "category": "디저트",
    "name": "콘쫀득볼(치즈와 앙금/2ea)",
    "qty": 2,
    "total_sales": 7000,
    "dine_in": 7000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 188,
    "category": "배달_아이스크림",
    "name": "꿀초링 요거트 아이스크림",
    "qty": 1,
    "total_sales": 6700,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 6700
  },
  {
    "rank": 189,
    "category": "차 / 흑당버블",
    "name": "깔라만시티(ICED)",
    "qty": 2,
    "total_sales": 6500,
    "dine_in": 0,
    "take_out": 6500,
    "delivery": 0
  },
  {
    "rank": 190,
    "category": "차 / 흑당버블",
    "name": "빽사이즈 아이스티 망고추가(아.망.추)",
    "qty": 1,
    "total_sales": 6300,
    "dine_in": 6300,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 191,
    "category": "디저트",
    "name": "청키 초코칩 쿠키",
    "qty": 3,
    "total_sales": 6000,
    "dine_in": 4000,
    "take_out": 2000,
    "delivery": 0
  },
  {
    "rank": 192,
    "category": "디저트",
    "name": "크랜베리 쿠키",
    "qty": 3,
    "total_sales": 6000,
    "dine_in": 0,
    "take_out": 6000,
    "delivery": 0
  },
  {
    "rank": 193,
    "category": "MD 상품",
    "name": "[MD] 캐치티니핑 밀크",
    "qty": 4,
    "total_sales": 6000,
    "dine_in": 1500,
    "take_out": 4500,
    "delivery": 0
  },
  {
    "rank": 194,
    "category": "MD 상품",
    "name": "[MD] 캐치티니핑 딸기",
    "qty": 4,
    "total_sales": 6000,
    "dine_in": 1500,
    "take_out": 4500,
    "delivery": 0
  },
  {
    "rank": 195,
    "category": "디저트",
    "name": "초코츄러스 쫀득볼(3ea)",
    "qty": 2,
    "total_sales": 5600,
    "dine_in": 5600,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 196,
    "category": "커피",
    "name": "콜드브루 흑당라떼(ICED)",
    "qty": 1,
    "total_sales": 5500,
    "dine_in": 0,
    "take_out": 5500,
    "delivery": 0
  },
  {
    "rank": 197,
    "category": "배달_디저트",
    "name": "빽그램핫도그",
    "qty": 1,
    "total_sales": 5300,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 5300
  },
  {
    "rank": 198,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "레드핫 빽그램핫도그",
    "qty": 1,
    "total_sales": 5100,
    "dine_in": 0,
    "take_out": 5100,
    "delivery": 0
  },
  {
    "rank": 199,
    "category": "커피",
    "name": "원조커피(HOT)",
    "qty": 2,
    "total_sales": 5000,
    "dine_in": 0,
    "take_out": 5000,
    "delivery": 0
  },
  {
    "rank": 200,
    "category": "음료",
    "name": "빽사이즈 초코라떼(ICED)",
    "qty": 1,
    "total_sales": 5000,
    "dine_in": 0,
    "take_out": 5000,
    "delivery": 0
  },
  {
    "rank": 201,
    "category": "음료",
    "name": "빽사이즈 딸기라떼",
    "qty": 1,
    "total_sales": 5000,
    "dine_in": 0,
    "take_out": 5000,
    "delivery": 0
  },
  {
    "rank": 202,
    "category": "배달_빽스치노",
    "name": "피스타치오빽스치노(베이직)w노란빨대",
    "qty": 1,
    "total_sales": 5000,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 5000
  },
  {
    "rank": 203,
    "category": "디저트",
    "name": "커스터드홀릭 바움쿠헨",
    "qty": 2,
    "total_sales": 5000,
    "dine_in": 2500,
    "take_out": 2500,
    "delivery": 0
  },
  {
    "rank": 204,
    "category": "커피",
    "name": "크리미콜드브루 카라멜",
    "qty": 1,
    "total_sales": 4800,
    "dine_in": 0,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 205,
    "category": "음료",
    "name": "피스타치오 생크림 초코라떼(ICED)",
    "qty": 1,
    "total_sales": 4800,
    "dine_in": 0,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 206,
    "category": "음료",
    "name": "생크림 우베라떼(ICED)",
    "qty": 1,
    "total_sales": 4800,
    "dine_in": 0,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 207,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "바닐라커피 빽스치노(베이직)",
    "qty": 1,
    "total_sales": 4800,
    "dine_in": 0,
    "take_out": 4800,
    "delivery": 0
  },
  {
    "rank": 208,
    "category": "디저트",
    "name": "크리미단팥빵",
    "qty": 2,
    "total_sales": 4600,
    "dine_in": 0,
    "take_out": 4600,
    "delivery": 0
  },
  {
    "rank": 209,
    "category": "배달_음료",
    "name": "미숫가루(우유)",
    "qty": 1,
    "total_sales": 4500,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 2500
  },
  {
    "rank": 210,
    "category": "배달_커피",
    "name": "달달연유라떼(ICED)",
    "qty": 1,
    "total_sales": 4200,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 4200
  },
  {
    "rank": 211,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "홀릭 바움쿠헨 세트(HOT)",
    "qty": 1,
    "total_sales": 4200,
    "dine_in": 4200,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 212,
    "category": "디저트",
    "name": "초코 컵빙수",
    "qty": 1,
    "total_sales": 4200,
    "dine_in": 0,
    "take_out": 4200,
    "delivery": 0
  },
  {
    "rank": 213,
    "category": "미분류",
    "name": "아메리카노(ICED)",
    "qty": 2,
    "total_sales": 4000,
    "dine_in": 0,
    "take_out": 4000,
    "delivery": 0
  },
  {
    "rank": 214,
    "category": "커피",
    "name": "디카페인 콜드브루(HOT)",
    "qty": 1,
    "total_sales": 4000,
    "dine_in": 4000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 215,
    "category": "음료",
    "name": "우유(ICED)",
    "qty": 2,
    "total_sales": 4000,
    "dine_in": 4000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 216,
    "category": "차 / 흑당버블",
    "name": "우롱티(ICED)",
    "qty": 2,
    "total_sales": 4000,
    "dine_in": 2000,
    "take_out": 2000,
    "delivery": 0
  },
  {
    "rank": 217,
    "category": "주스 / 에이드",
    "name": "제로슈거 자몽에이드",
    "qty": 1,
    "total_sales": 4000,
    "dine_in": 0,
    "take_out": 4000,
    "delivery": 0
  },
  {
    "rank": 218,
    "category": "커피",
    "name": "카페모카(HOT)",
    "qty": 1,
    "total_sales": 3900,
    "dine_in": 0,
    "take_out": 3900,
    "delivery": 0
  },
  {
    "rank": 219,
    "category": "배달_커피",
    "name": "아이스티샷추가(아.샷.추)",
    "qty": 1,
    "total_sales": 3900,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 3900
  },
  {
    "rank": 220,
    "category": "프로모션/신메뉴/시즌메뉴",
    "name": "레드핫 소세지빵",
    "qty": 1,
    "total_sales": 3800,
    "dine_in": 3800,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 221,
    "category": "커피",
    "name": "헤이즐넛라떼(HOT)",
    "qty": 1,
    "total_sales": 3700,
    "dine_in": 0,
    "take_out": 3700,
    "delivery": 0
  },
  {
    "rank": 222,
    "category": "커피",
    "name": "달달연유라떼(HOT)",
    "qty": 1,
    "total_sales": 3700,
    "dine_in": 0,
    "take_out": 1700,
    "delivery": 0
  },
  {
    "rank": 223,
    "category": "미분류",
    "name": "달달연유라떼(ICED)",
    "qty": 1,
    "total_sales": 3700,
    "dine_in": 0,
    "take_out": 3700,
    "delivery": 0
  },
  {
    "rank": 224,
    "category": "음료",
    "name": "바나나라떼(HOT)",
    "qty": 1,
    "total_sales": 3500,
    "dine_in": 0,
    "take_out": 3500,
    "delivery": 0
  },
  {
    "rank": 225,
    "category": "음료",
    "name": "초코라떼(HOT)",
    "qty": 1,
    "total_sales": 3500,
    "dine_in": 0,
    "take_out": 3500,
    "delivery": 0
  },
  {
    "rank": 226,
    "category": "차 / 흑당버블",
    "name": "밀크티(HOT)",
    "qty": 1,
    "total_sales": 3500,
    "dine_in": 0,
    "take_out": 3500,
    "delivery": 0
  },
  {
    "rank": 227,
    "category": "차 / 흑당버블",
    "name": "레몬티(HOT)",
    "qty": 1,
    "total_sales": 3500,
    "dine_in": 3500,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 228,
    "category": "차 / 흑당버블",
    "name": "레몬얼그레이티(HOT)",
    "qty": 1,
    "total_sales": 3500,
    "dine_in": 3500,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 229,
    "category": "음료",
    "name": "율무라떼(HOT)",
    "qty": 1,
    "total_sales": 3300,
    "dine_in": 0,
    "take_out": 3300,
    "delivery": 0
  },
  {
    "rank": 230,
    "category": "차 / 흑당버블",
    "name": "피치우롱스위티(HOT)",
    "qty": 1,
    "total_sales": 3000,
    "dine_in": 0,
    "take_out": 3000,
    "delivery": 0
  },
  {
    "rank": 231,
    "category": "배달_디저트",
    "name": "크랜베리 쿠키",
    "qty": 1,
    "total_sales": 3000,
    "dine_in": 0,
    "take_out": 0,
    "delivery": 3000
  },
  {
    "rank": 232,
    "category": "커피",
    "name": "꿀 아메리카노(HOT)",
    "qty": 1,
    "total_sales": 2700,
    "dine_in": 2700,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 233,
    "category": "음료",
    "name": "수정과(HOT)",
    "qty": 1,
    "total_sales": 2700,
    "dine_in": 0,
    "take_out": 700,
    "delivery": 0
  },
  {
    "rank": 234,
    "category": "디저트",
    "name": "마카롱(초코크런치)",
    "qty": 1,
    "total_sales": 2500,
    "dine_in": 0,
    "take_out": 2500,
    "delivery": 0
  },
  {
    "rank": 235,
    "category": "디저트",
    "name": "초코홀릭 바움쿠헨",
    "qty": 1,
    "total_sales": 2500,
    "dine_in": 0,
    "take_out": 2500,
    "delivery": 0
  },
  {
    "rank": 236,
    "category": "디저트",
    "name": "치즈홀릭 바움쿠헨",
    "qty": 1,
    "total_sales": 2500,
    "dine_in": 2500,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 237,
    "category": "디저트",
    "name": "크리미슈",
    "qty": 1,
    "total_sales": 2300,
    "dine_in": 0,
    "take_out": 2300,
    "delivery": 0
  },
  {
    "rank": 238,
    "category": "MD 상품",
    "name": "[MD]코카콜라",
    "qty": 1,
    "total_sales": 2000,
    "dine_in": 2000,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 239,
    "category": "MD 상품",
    "name": "[MD] 캐치티니핑 사과",
    "qty": 1,
    "total_sales": 1500,
    "dine_in": 0,
    "take_out": 1500,
    "delivery": 0
  },
  {
    "rank": 240,
    "category": "ETC",
    "name": "에스프레소 1샷 추가",
    "qty": 2,
    "total_sales": 1200,
    "dine_in": 0,
    "take_out": 1200,
    "delivery": 0
  },
  {
    "rank": 241,
    "category": "ETC",
    "name": "나타드코코추가",
    "qty": 1,
    "total_sales": 500,
    "dine_in": 500,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 242,
    "category": "ETC",
    "name": "텀블러할인",
    "qty": 2,
    "total_sales": -200,
    "dine_in": -200,
    "take_out": 0,
    "delivery": 0
  },
  {
    "rank": 243,
    "category": "커피",
    "name": "(개인컵)텀블러 할인",
    "qty": 27,
    "total_sales": -2700,
    "dine_in": 0,
    "take_out": -2700,
    "delivery": 0
  }
];

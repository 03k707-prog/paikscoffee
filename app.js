// 광희's 빽다방 통합 운영 대시보드 - 핵심 비즈니스 로직 (Vanilla JS)

document.addEventListener('DOMContentLoaded', () => {
    // 1. 상태 데이터 복제 (재고 변동 시뮬레이션을 위해 복사본 사용)
    let currentInventory = JSON.parse(JSON.stringify(INITIAL_ITEMS));
    let totalSalesAccumulated = 1250000; // 초기 판매액 누적
    let totalOrdersAccumulated = 12;
    
    // UI 요소 캐싱
    const tableBody = document.getElementById('inventory-table-body');
    const searchInput = document.getElementById('inventory-search');
    const categorySelect = document.getElementById('inventory-category-filter');
    const beverageSelect = document.getElementById('beverage-select');
    const beverageQtyInput = document.getElementById('beverage-qty');
    const btnSimulate = document.getElementById('btn-simulate');
    const toast = document.getElementById('toast-notif');
    
    // KPI 요소 캐싱
    const kpiSales = document.getElementById('kpi-sales');
    const kpiOrders = document.getElementById('kpi-orders');
    const kpiLowStock = document.getElementById('kpi-low-stock');

    // 2. 레시피 선택 셀렉트박스 동적 로드
    function initBeverageSelector() {
        beverageSelect.innerHTML = '<option value="">-- 음료를 선택하세요 --</option>';
        // 레시피 목록 가나다순 정렬
        const sortedRecipes = [...RECIPES].sort((a, b) => a.menu_name.localeCompare(b.menu_name));
        
        sortedRecipes.forEach(r => {
            const option = document.createElement('option');
            option.value = r.id;
            option.textContent = `${r.menu_name} (${r.temperature})`;
            beverageSelect.appendChild(option);
        });
    }

    // 3. 재고 상태 등급 판별 함수
    // 컵/뚜껑/빨대 등 부자재(일회용품)는 수량이 크므로 비율로 상태 판별
    function getStockStatus(item) {
        const ratio = item.current_qty / item.safety_qty;
        if (ratio <= 0.5) return { text: 'Critical', class: 'critical', barClass: 'critical' };
        if (ratio <= 1.2) return { text: 'Low', class: 'low', barClass: 'warning' };
        return { text: 'Safe', class: 'safe', barClass: 'safe' };
    }

    // 4. 재고 테이블 렌더링 함수
    function renderInventoryTable(filterText = '', filterCategory = 'ALL') {
        tableBody.innerHTML = '';
        
        let filteredItems = currentInventory.filter(item => {
            const matchesSearch = item.품목명.toLowerCase().includes(filterText.toLowerCase()) || 
                                  item.품목ID.toLowerCase().includes(filterText.toLowerCase()) ||
                                  (item.원본품목명 && item.원본품목명.toLowerCase().includes(filterText.toLowerCase()));
            
            const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory;
            
            return matchesSearch && matchesCategory;
        });

        // 렌더링할 목록이 비었을 때
        if (filteredItems.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">검색 결과에 맞는 품목이 없습니다.</td></tr>`;
            return;
        }

        filteredItems.forEach(item => {
            const status = getStockStatus(item);
            const tr = document.createElement('tr');
            
            // 비율 계산 (최대 100%로 시각화 조정)
            const maxVal = item.safety_qty * 3;
            let percent = Math.min((item.current_qty / maxVal) * 100, 100);
            if (percent < 5 && item.current_qty > 0) percent = 5; // 최소 5%는 보이도록 설정
            
            // 포맷 가격
            const priceFormatted = item.단가.toLocaleString();
            
            // 수량 표시 (실수 소수점 첫째자리까지 렌더링)
            const qtyFormatted = typeof item.current_qty === 'number' ? item.current_qty.toFixed(1) : item.current_qty;
            const safetyFormatted = typeof item.safety_qty === 'number' ? item.safety_qty.toFixed(1) : item.safety_qty;

            tr.innerHTML = `
                <td style="font-weight: 600;">[${item.품목ID}] ${item.품목명}</td>
                <td>${item.category}</td>
                <td>
                    <div class="progress-bar-container">
                        <div class="progress-bar ${status.barClass}" style="width: ${percent}%;"></div>
                    </div>
                    <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
                        ${qtyFormatted} / ${safetyFormatted} ${item.단위}
                    </div>
                </td>
                <td>
                    <span class="item-badge ${status.class}">${status.text}</span>
                </td>
                <td>
                    <span style="font-size: 12px; font-weight: 600; color: var(--text-muted);">${item.과세구분}</span>
                </td>
                <td style="text-align: right; font-weight: 500;">
                    ${priceFormatted}원
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // KPI 경고 품목 수 실시간 갱신
        updateLowStockKPI();
    }

    // 5. 저재고 경보 개수 실시간 연산 및 KPI 반영
    function updateLowStockKPI() {
        const lowItemsCount = currentInventory.filter(item => {
            const status = getStockStatus(item);
            return status.text === 'Critical' || status.text === 'Low';
        }).length;
        
        kpiLowStock.textContent = `${lowItemsCount}개`;
        
        // Critical이 존재하면 애니메이션 진동 알림 효과 제공
        const criticalCount = currentInventory.filter(item => getStockStatus(item).text === 'Critical').length;
        if (criticalCount > 0) {
            kpiLowStock.closest('.kpi-card').style.borderColor = 'var(--error)';
        } else {
            kpiLowStock.closest('.kpi-card').style.borderColor = '';
        }
    }

    // 6. 음료 판매량 입력 시뮬레이션 처리 함수
    function handleSalesSimulation() {
        const selectedRecipeId = beverageSelect.value;
        const salesQty = parseInt(beverageQtyInput.value);

        if (!selectedRecipeId) {
            alert('음료를 선택해 주세요.');
            return;
        }
        if (isNaN(salesQty) || salesQty <= 0) {
            alert('올바른 수량을 입력해 주세요.');
            return;
        }

        const recipe = RECIPES.find(r => r.id === selectedRecipeId);
        if (!recipe) return;

        // 원자재 및 부자재 소모 처리
        let deductedList = [];
        recipe.ingredients.forEach(ing => {
            const item = currentInventory.find(i => i.품목ID === ing.item_id);
            if (item) {
                const totalDeducted = ing.amount * salesQty;
                item.current_qty = Math.max(item.current_qty - totalDeducted, 0); // 재고 차감 (0 이하 예방)
                deductedList.push(`${item.품목명} ${totalDeducted.toFixed(1)}${ing.unit}`);
            }
        });

        // 매출 실적 카드 데이터 실시간 상승 누적
        // 평균 가격 4,500원 기준으로 임의 매출 증가 계산
        const salesAmountAdded = (salesQty * 4800);
        totalSalesAccumulated += salesAmountAdded;
        totalOrdersAccumulated += salesQty;

        // KPI 애니메이션 갱신
        kpiSales.textContent = `${totalSalesAccumulated.toLocaleString()} KRW`;
        kpiOrders.textContent = `${totalOrdersAccumulated}`;

        // 테이블 갱신
        renderInventoryTable(searchInput.value, categorySelect.value);

        // 성공 토스트 알림 메시지 출력
        showToast(recipe.menu_name, salesQty, deductedList);
    }

    // 7. 토스트 팝업 제어
    function showToast(menuName, qty, deducted) {
        const textEl = document.getElementById('toast-text');
        textEl.innerHTML = `<strong>${menuName} ${qty}잔</strong> 판매 등록 완료! <br><span style="font-size: 11px; opacity: 0.85;">차감: ${deducted.slice(0, 3).join(', ')}${deducted.length > 3 ? ' 외 ' + (deducted.length - 3) + '건' : ''}</span>`;
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // 8. 검색 및 필터 이벤트 이벤트 바인딩
    searchInput.addEventListener('input', () => {
        renderInventoryTable(searchInput.value, categorySelect.value);
    });

    categorySelect.addEventListener('change', () => {
        renderInventoryTable(searchInput.value, categorySelect.value);
    });

    btnSimulate.addEventListener('click', handleSalesSimulation);

    // 8.5 탭(대시보드 vs 레시피 관리 vs 매출 분석) 전환 로직
    const navDashboard = document.getElementById('nav-dashboard');
    const navRecipes = document.getElementById('nav-recipes');
    const navSales = document.getElementById('nav-sales');
    const dashboardView = document.getElementById('dashboard-view');
    const recipeView = document.getElementById('recipe-view');
    const salesAnalysisView = document.getElementById('sales-analysis-view');

    function switchView(viewName) {
        // 모든 nav-item에서 active 제거
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });

        if (viewName === 'dashboard') {
            dashboardView.style.display = 'flex';
            recipeView.style.display = 'none';
            salesAnalysisView.style.display = 'none';
            if (navDashboard) navDashboard.classList.add('active');
        } else if (viewName === 'recipes') {
            dashboardView.style.display = 'none';
            recipeView.style.display = 'flex';
            salesAnalysisView.style.display = 'none';
            if (navRecipes) navRecipes.classList.add('active');
        } else if (viewName === 'sales') {
            dashboardView.style.display = 'none';
            recipeView.style.display = 'none';
            salesAnalysisView.style.display = 'flex';
            if (navSales) navSales.classList.add('active');
            // 매출 분석 차트 및 대장 로드
            initSalesAnalysis();
        }
    }

    if (navDashboard) {
        navDashboard.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('dashboard');
        });
    }

    if (navRecipes) {
        navRecipes.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('recipes');
        });
    }

    if (navSales) {
        navSales.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('sales');
        });
    }

    // 사이드바 카테고리 링크 클릭 시 테이블 자동 필터링 매핑
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.querySelector('span:not(.nav-icon)').textContent.trim();
            if (text === 'Inventory (재고)') {
                e.preventDefault();
                
                // 만약 레시피 뷰가 열려있다면 대시보드로 복귀 후 스크롤
                switchView('dashboard');
                
                categorySelect.value = 'ALL';
                renderInventoryTable('', 'ALL');
                
                // 스크롤 이동
                setTimeout(() => {
                    const invSection = document.getElementById('inventory-section');
                    if (invSection) invSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
    });

    // 9. 모바일 앱 모드 좌측 패널(사이드바) 토글 로직
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleSidebarBtn && closeSidebarBtn && sidebar && overlay) {
        const toggleSidebar = () => {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        };

        toggleSidebarBtn.addEventListener('click', toggleSidebar);
        closeSidebarBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);

        // 네비게이션 아이템 클릭 시 모바일에선 사이드바를 자동으로 닫아줌
        const mobileNavItems = sidebar.querySelectorAll('.nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                if (sidebar.classList.contains('show')) {
                    toggleSidebar();
                }
            });
        });
    }

    // 10. 매출 분석 전용 데이터 렌더링 및 차트 시각화 모듈
    function initSalesAnalysis() {
        if (typeof INCOME_DAILY_RECORDS === 'undefined') return;

        // 1) KPI 카드 값 연산 및 주입
        const todayRec = INCOME_DAILY_RECORDS[INCOME_DAILY_RECORDS.length - 1];
        const julyStat = INCOME_MONTHLY_SUMMARY.find(m => m.month === '2026-07');
        
        // 오늘 매출액
        document.getElementById('sales-kpi-today').textContent = todayRec.total_sales.toLocaleString() + ' KRW';
        document.getElementById('sales-kpi-dod-pct').textContent = (todayRec.dod_pct >= 0 ? '+' : '') + todayRec.dod_pct + '%';
        document.getElementById('sales-kpi-dod-pct').className = 'kpi-badge ' + (todayRec.dod_pct >= 0 ? 'trend-up' : 'trend-down');
        
        // 당월 매출액 (전월비)
        if (julyStat) {
            document.getElementById('sales-kpi-month').textContent = julyStat.total_sales.toLocaleString() + ' KRW';
            document.getElementById('sales-kpi-mom-pct').textContent = (julyStat.mom_pct >= 0 ? '+' : '') + julyStat.mom_pct + '%';
            document.getElementById('sales-kpi-mom-pct').className = 'kpi-badge ' + (julyStat.mom_pct >= 0 ? 'trend-up' : 'trend-down');
        }

        // 최고 요일
        const weekdayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const weekdaySums = [0, 0, 0, 0, 0, 0, 0];
        const weekdayCounts = [0, 0, 0, 0, 0, 0, 0];
        INCOME_DAILY_RECORDS.forEach(r => {
            const d = new Date(r.date);
            const dayIdx = d.getDay();
            weekdaySums[dayIdx] += r.total_sales;
            weekdayCounts[dayIdx]++;
        });
        let bestIdx = 0;
        let bestAvg = 0;
        for (let i = 0; i < 7; i++) {
            const avg = weekdayCounts[i] > 0 ? weekdaySums[i] / weekdayCounts[i] : 0;
            if (avg > bestAvg) {
                bestAvg = avg;
                bestIdx = i;
            }
        }
        document.getElementById('sales-kpi-best-day').textContent = weekdayNames[bestIdx];

        // 배달/픽업 비율 계산
        let totalAll = 0, totalDelivPickup = 0;
        INCOME_DAILY_RECORDS.forEach(r => {
            totalAll += r.total_sales;
            totalDelivPickup += (r.delivery_sales + r.pickup_sales);
        });
        const delivShare = totalAll > 0 ? Math.round((totalDelivPickup / totalAll) * 100) : 0;
        document.getElementById('sales-kpi-delivery-share').textContent = delivShare + '%';
        document.getElementById('sales-kpi-delivery-ratio').textContent = '배달비중';
        document.getElementById('sales-kpi-delivery-ratio').className = 'kpi-badge info';

        // 2) 일별 매출 추이 SVG 차트 렌더링
        renderSalesTrendChart();

        // 3) 채널별 매출 추이 SVG 차트 렌더링
        renderChannelTrendChart();

        // 4) 채널별 점유율 도넛 차트 렌더링
        renderChannelDonutChart();

        // 5) 일별 매출 테이블 주입 및 필터링 바인딩
        renderSalesTable('ALL');
        
        // 필터 변경 시 이벤트 재연동
        const monthFilter = document.getElementById('sales-month-filter');
        if (monthFilter) {
            monthFilter.onchange = () => {
                renderSalesTable(monthFilter.value);
            };
        }
    }

    // 일별 매출 추이 차트 렌더링 (SVG)
    function renderSalesTrendChart() {
        const box = document.getElementById('trend-chart-box');
        if (!box) return;

        const data = INCOME_DAILY_RECORDS;
        const maxSales = Math.max(...data.map(r => r.total_sales));
        
        // SVG 사이즈 설정
        const width = box.clientWidth || 800;
        const height = 280;
        const padLeft = 70;
        const padRight = 30;
        const padTop = 30;
        const padBottom = 40;
        
        const graphW = width - padLeft - padRight;
        const graphH = height - padTop - padBottom;

        const getX = (index) => padLeft + (index / (data.length - 1)) * graphW;
        const getY = (val) => padTop + graphH - (val / maxSales) * graphH;

        let svgContent = `<svg class="chart-svg" width="${width}" height="${height}">`;
        
        // 가로 그리드선 (4개 선)
        for (let i = 0; i <= 4; i++) {
            const val = (maxSales / 4) * i;
            const y = getY(val);
            svgContent += `
                <line class="chart-grid-line" x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}"></line>
                <text class="chart-text" x="${padLeft - 10}" y="${y + 4}" text-anchor="end">${(val / 10000).toFixed(0)}만</text>
            `;
        }

        // 영역 셰이딩 패스
        let areaPoints = `${getX(0)},${getY(0)} `;
        let linePoints = "";
        
        data.forEach((r, idx) => {
            const x = getX(idx);
            const y = getY(r.total_sales);
            areaPoints += `${x},${y} `;
            linePoints += `${x},${y} `;
        });
        
        areaPoints += `${getX(data.length - 1)},${getY(0)}`;
        
        // 셰이딩 그리기 (필드 색칠)
        svgContent += `<polygon class="chart-area" points="${areaPoints}" style="fill: var(--primary-light); opacity: 0.12;"></polygon>`;
        
        // 꺾은선 그리기
        svgContent += `<polyline class="chart-line" points="${linePoints}"></polyline>`;
        
        // 포인트 동그라미 그리기 (모든 영업일 포인트를 동적으로 주입하여 클릭 인터랙션 확보)
        data.forEach((r, idx) => {
            const x = getX(idx);
            const y = getY(r.total_sales);
            svgContent += `
                <circle class="chart-point" cx="${x}" cy="${y}" r="4" 
                        data-date="${r.date}"
                        data-total="${r.total_sales}"
                        data-hall="${r.hall_sales}"
                        data-bmd="${r.baemin_delivery}"
                        data-bmp="${r.baemin_pickup}"
                        data-cpe="${r.coupang_eats}"
                        data-x="${x}"
                        data-y="${y}">
                    <title>${r.date}\n클릭 시 채널별 상세 매출 플로팅</title>
                </circle>
            `;
        });

        // X축 날짜 레이블 (6개 데이터 포인트만 샘플링)
        const xStep = Math.ceil(data.length / 5);
        data.forEach((r, idx) => {
            if (idx % xStep === 0 || idx === data.length - 1) {
                const x = getX(idx);
                const label = r.date.substring(5);
                svgContent += `
                    <text class="chart-text" x="${x}" y="${height - 15}" text-anchor="middle">${label}</text>
                `;
            }
        });

        svgContent += `</svg>`;
        
        // 동적 툴팁 팝업 HTML 구조 주입 (innerHTML 덮어쓰기 삭제 현상 방지)
        const tooltipHtml = `
            <div id="chart-floating-tooltip" style="position: absolute; display: none; background: rgba(15, 23, 42, 0.95); color: #ffffff; padding: 12px 16px; border-radius: 8px; box-shadow: var(--shadow-lg); z-index: 1000; font-size: 11px; border: 1px solid rgba(255, 255, 255, 0.15); pointer-events: none; backdrop-filter: blur(4px); min-width: 170px;">
                <div id="floating-date" style="font-weight: 800; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 6px; color: var(--primary);"></div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between;"><span>총 매출액:</span><span id="floating-total" style="font-weight: 700;">0원</span></div>
                    <div style="display: flex; justify-content: space-between; opacity: 0.85;"><span>ㄴ 홀 매출:</span><span id="floating-hall">0원</span></div>
                    <div style="display: flex; justify-content: space-between; opacity: 0.85;"><span>ㄴ 배민 배달:</span><span id="floating-bm-del">0원</span></div>
                    <div style="display: flex; justify-content: space-between; opacity: 0.85;"><span>ㄴ 배민 픽업:</span><span id="floating-bm-pic">0원</span></div>
                    <div style="display: flex; justify-content: space-between; opacity: 0.85;"><span>ㄴ 쿠팡이츠:</span><span id="floating-cp-eats">0원</span></div>
                </div>
            </div>
        `;
        box.innerHTML = svgContent + tooltipHtml;

        // 포인트 클릭 시 팝업 띄우기 이벤트 바인딩
        const points = box.querySelectorAll('.chart-point');
        const tooltip = box.querySelector('#chart-floating-tooltip');
        
        points.forEach(pt => {
            pt.addEventListener('click', (e) => {
                e.stopPropagation(); // document 클릭 전파 차단
                
                const date = pt.getAttribute('data-date');
                const total = parseInt(pt.getAttribute('data-total')).toLocaleString() + '원';
                const hall = parseInt(pt.getAttribute('data-hall')).toLocaleString() + '원';
                const bmd = parseInt(pt.getAttribute('data-bmd')).toLocaleString() + '원';
                const bmp = parseInt(pt.getAttribute('data-bmp')).toLocaleString() + '원';
                const cpe = parseInt(pt.getAttribute('data-cpe')).toLocaleString() + '원';
                
                const cx = parseFloat(pt.getAttribute('data-x'));
                const cy = parseFloat(pt.getAttribute('data-y'));
                
                document.getElementById('floating-date').textContent = date;
                document.getElementById('floating-total').textContent = total;
                document.getElementById('floating-hall').textContent = hall;
                document.getElementById('floating-bm-del').textContent = bmd;
                document.getElementById('floating-bm-pic').textContent = bmp;
                document.getElementById('floating-cp-eats').textContent = cpe;
                
                // 팝업 위치 세팅 (차트 가로 위치를 고려해 팝업이 우측으로 넘치지 않게 조율)
                const tooltipWidth = 170;
                let leftPos = cx + 12;
                if (cx + tooltipWidth > box.clientWidth) {
                    leftPos = cx - tooltipWidth - 12; // 팝업을 좌측으로 배치
                }
                
                tooltip.style.left = leftPos + 'px';
                tooltip.style.top = (cy - 60) + 'px';
                tooltip.style.display = 'block';
                
                // 포인트 크기 하이라이트 피드백
                points.forEach(p => p.setAttribute('r', '4'));
                pt.setAttribute('r', '7');
            });
        });

        // 다른 영역 클릭 시 팝업 숨기기 글로벌 리스너
        const handleOutsideClick = () => {
            if (tooltip) {
                tooltip.style.display = 'none';
                points.forEach(p => p.setAttribute('r', '4'));
            }
        };
        document.removeEventListener('click', handleOutsideClick);
        document.addEventListener('click', handleOutsideClick);
    }

    // 채널별 매출 추이 차트 렌더링 (SVG + 세로선 호버 인터랙션)
    function renderChannelTrendChart() {
        const box = document.getElementById('channel-trend-chart-box');
        if (!box) return;

        const data = INCOME_DAILY_RECORDS;
        
        // 홀매출, 배민배달, 배민픽업, 쿠팡이츠 4개 채널의 개별선으로 시각화
        const maxVal = Math.max(...data.map(r => Math.max(r.hall_sales, r.baemin_delivery, r.baemin_pickup, r.coupang_eats)));

        const width = box.clientWidth || 800;
        const height = 240;
        const padLeft = 70;
        const padRight = 30;
        const padTop = 20;
        const padBottom = 40;
        
        const graphW = width - padLeft - padRight;
        const graphH = height - padTop - padBottom;

        const getX = (index) => padLeft + (index / (data.length - 1)) * graphW;
        const getY = (val) => padTop + graphH - (val / maxVal) * graphH;

        let svgContent = `<svg class="chart-svg" width="${width}" height="${height}">`;

        // 가로 그리드선
        for (let i = 0; i <= 3; i++) {
            const val = (maxVal / 3) * i;
            const y = getY(val);
            svgContent += `
                <line class="chart-grid-line" x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}"></line>
                <text class="chart-text" x="${padLeft - 10}" y="${y + 4}" text-anchor="end">${(val / 10000).toFixed(0)}만</text>
            `;
        }

        // 세로 가이드 라인 (숨김 상태로 생성)
        svgContent += `
            <line id="channel-guide-line" x1="0" y1="${padTop}" x2="0" y2="${padTop + graphH}" 
                  stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="3 3" style="display: none; pointer-events: none;"></line>
        `;

        // 채널별 키와 색상 정의
        const channels = [
            { key: "hall_sales", class: "hall", label: "홀 매출", color: "#FCDA00" },
            { key: "baemin_delivery", class: "bmdel", label: "배민 배달", color: "#2ac1bc" },
            { key: "baemin_pickup", class: "bmpic", label: "배민 픽업", color: "#6be0dc" },
            { key: "coupang_eats", class: "cpeats", label: "쿠팡이츠", color: "#ffaa00" }
        ];

        // 4개 라인 패스 그리기
        channels.forEach(ch => {
            let linePoints = "";
            let areaPoints = `${getX(0)},${getY(0)} `;
            
            data.forEach((r, idx) => {
                const x = getX(idx);
                const val = r[ch.key];
                const y = getY(val);
                linePoints += `${x},${y} `;
                areaPoints += `${x},${y} `;
            });
            areaPoints += `${getX(data.length - 1)},${getY(0)}`;

            // 면적 색칠 (채널별로 fill 색상 투명도 다르게 처리)
            svgContent += `<polygon class="chart-area" points="${areaPoints}" style="fill: ${ch.color}; opacity: 0.03;"></polygon>`;
            // 꺾은선 그리기
            svgContent += `<polyline class="chart-line" points="${linePoints}" style="stroke: ${ch.color}; stroke-width: 2.2;"></polyline>`;
        });

        // X축 라벨
        const xStep = Math.ceil(data.length / 5);
        data.forEach((r, idx) => {
            if (idx % xStep === 0 || idx === data.length - 1) {
                const x = getX(idx);
                const label = r.date.substring(5);
                svgContent += `
                    <text class="chart-text" x="${x}" y="${height - 15}" text-anchor="middle">${label}</text>
                `;
            }
        });

        // 호버 인식을 위한 세로 투명 컬럼 영역들 주입
        data.forEach((r, idx) => {
            const x = getX(idx);
            const w = idx === 0 || idx === data.length - 1 ? graphW / (data.length - 1) / 2 : graphW / (data.length - 1);
            const rx = idx === 0 ? x : x - w/2;
            
            svgContent += `
                <rect class="channel-hover-zone" x="${rx}" y="${padTop}" width="${w}" height="${graphH}" fill="transparent" style="cursor: pointer;"
                      data-index="${idx}">
                </rect>
            `;
        });

        svgContent += `</svg>`;
        
        // 동적 채널 툴팁 HTML 구조 주입 (innerHTML 덮어쓰기 삭제 현상 방지)
        const tooltipHtml = `
            <div id="channel-floating-tooltip" style="position: absolute; display: none; background: rgba(15, 23, 42, 0.95); color: #ffffff; padding: 12px 16px; border-radius: 8px; box-shadow: var(--shadow-lg); z-index: 1000; font-size: 11px; border: 1px solid rgba(255, 255, 255, 0.15); pointer-events: none; backdrop-filter: blur(4px); min-width: 180px;">
                <div id="channel-floating-date" style="font-weight: 800; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 6px; color: var(--primary);"></div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; font-weight: 700; color: #fff;"><span>일 총매출:</span><span id="channel-floating-total">0원</span></div>
                    <div style="display: flex; justify-content: space-between; color: #fff;"><span>ㄴ 홀 매출:</span><span id="channel-floating-hall" style="font-weight:700; color:#FCDA00;">0원</span></div>
                    <div style="display: flex; justify-content: space-between; color: #fff;"><span>ㄴ 배민 배달:</span><span id="channel-floating-bmd" style="font-weight:700; color:#2ac1bc;">0원</span></div>
                    <div style="display: flex; justify-content: space-between; color: #fff;"><span>ㄴ 배민 픽업:</span><span id="channel-floating-bmp" style="font-weight:700; color:#6be0dc;">0원</span></div>
                    <div style="display: flex; justify-content: space-between; color: #fff;"><span>ㄴ 쿠팡이츠:</span><span id="channel-floating-cpe" style="font-weight:700; color:#ffaa00;">0원</span></div>
                </div>
            </div>
        `;
        
        box.innerHTML = svgContent + tooltipHtml;

        // 세로선 호버 인터랙션 이벤트 바인딩
        const hoverZones = box.querySelectorAll('.channel-hover-zone');
        const guideLine = box.querySelector('#channel-guide-line');
        const tooltip = box.querySelector('#channel-floating-tooltip');

        hoverZones.forEach(zone => {
            zone.addEventListener('mousemove', (e) => {
                const idx = parseInt(zone.getAttribute('data-index'));
                const r = data[idx];
                const x = getX(idx);
                
                // 세로 가이드선 위치 조정 및 노출
                guideLine.setAttribute('x1', x);
                guideLine.setAttribute('x2', x);
                guideLine.style.display = 'block';
                
                // 팝업 내용 주입
                document.getElementById('channel-floating-date').textContent = r.date;
                document.getElementById('channel-floating-total').textContent = r.total_sales.toLocaleString() + '원';
                document.getElementById('channel-floating-hall').textContent = r.hall_sales.toLocaleString() + '원';
                document.getElementById('channel-floating-bmd').textContent = r.baemin_delivery.toLocaleString() + '원';
                document.getElementById('channel-floating-bmp').textContent = r.baemin_pickup.toLocaleString() + '원';
                document.getElementById('channel-floating-cpe').textContent = r.coupang_eats.toLocaleString() + '원';
                
                // 팝업 가로 오버플로우 방지 배치
                const tooltipWidth = 180;
                let leftPos = x + 15;
                if (x + tooltipWidth > box.clientWidth) {
                    leftPos = x - tooltipWidth - 15;
                }
                
                // 마우스 Y 높이에 맞춰 팝업 위치 결정 (경계 제한)
                const rect = box.getBoundingClientRect();
                const mouseY = e.clientY - rect.top;
                
                tooltip.style.left = leftPos + 'px';
                tooltip.style.top = Math.max(padTop, Math.min(mouseY - 60, padTop + graphH - 120)) + 'px';
                tooltip.style.display = 'block';
            });
            
            zone.addEventListener('mouseleave', () => {
                // 숨김 처리
                guideLine.style.display = 'none';
                tooltip.style.display = 'none';
            });
        });
    }

    // 채널 점유율 도넛 차트 (SVG)
    function renderChannelDonutChart() {
        const box = document.getElementById('channel-chart-box');
        const legendBox = document.getElementById('donut-legends');
        if (!box || !legendBox) return;

        let hall = 0, bmDel = 0, bmPic = 0, cpEats = 0;
        
        INCOME_DAILY_RECORDS.forEach(r => {
            hall += r.hall_sales;
            bmDel += r.baemin_delivery;
            bmPic += r.baemin_pickup;
            cpEats += r.coupang_eats;
        });

        if (typeof INCOME_CUMULATIVE_START !== 'undefined' && INCOME_CUMULATIVE_START) {
            hall += INCOME_CUMULATIVE_START.hall_sales;
            bmDel += INCOME_CUMULATIVE_START.baemin_delivery;
            bmPic += INCOME_CUMULATIVE_START.baemin_pickup;
            cpEats += INCOME_CUMULATIVE_START.coupang_eats;
        }

        const total = hall + bmDel + bmPic + cpEats;

        const channels = [
            { name: "홀 매출", value: hall, color: "#FCDA00" },
            { name: "배민 배달", value: bmDel, color: "#2ac1bc" },
            { name: "배민 픽업", value: bmPic, color: "#6be0dc" },
            { name: "쿠팡이츠", value: cpEats, color: "#ffaa00" }
        ];

        const r = 50;
        const C = 2 * Math.PI * r;
        
        let currentOffset = 0;
        let svgContent = `<svg viewBox="0 0 140 140" style="width: 140px; height: 140px;">
            <circle cx="70" cy="70" r="${r}" fill="none" stroke="#F1F5F9" stroke-width="18"></circle>
        `;

        let legendContent = "";

        channels.forEach(ch => {
            const pct = total > 0 ? (ch.value / total) : 0;
            const strokeVal = pct * C;
            const offsetVal = currentOffset;
            currentOffset -= strokeVal;

            if (strokeVal > 0) {
                svgContent += `
                    <circle class="donut-segment" cx="70" cy="70" r="${r}" 
                            fill="none" 
                            stroke="${ch.color}" 
                            stroke-width="18"
                            stroke-dasharray="${strokeVal} ${C - strokeVal}" 
                            stroke-dashoffset="${offsetVal}"
                            transform="rotate(-90 70 70)">
                        <title>${ch.name}: ${ch.value.toLocaleString()}원 (${(pct * 100).toFixed(1)}%)</title>
                    </circle>
                `;
            }

            legendContent += `
                <div class="legend-item">
                    <div class="legend-left">
                        <div class="legend-color" style="background-color: ${ch.color};"></div>
                        <span style="font-weight:600;">${ch.name}</span>
                    </div>
                    <div>
                        <span class="legend-pct">${(pct * 100).toFixed(1)}%</span>
                        <span style="font-size: 10px; color: var(--text-muted); margin-left: 8px;">${ch.value.toLocaleString()}원</span>
                    </div>
                </div>
            `;
        });

        const formattedTotal = (total / 1000000).toFixed(1) + "M";
        svgContent += `
            <text x="70" y="72" text-anchor="middle" font-weight="900" font-size="11" fill="var(--text-color)">${formattedTotal}</text>
            <text x="70" y="83" text-anchor="middle" font-size="7" fill="var(--text-muted)" font-weight="600">누적매출</text>
        </svg>`;

        box.innerHTML = svgContent;
        legendBox.innerHTML = legendContent;
    }

    // 매출 테이블 주입 및 필터링
    function renderSalesTable(monthFilter) {
        const body = document.getElementById('sales-table-body');
        if (!body) return;

        body.innerHTML = "";

        const filtered = INCOME_DAILY_RECORDS.filter(r => {
            return monthFilter === 'ALL' || r.date.startsWith(monthFilter);
        });

        const sorted = [...filtered].reverse();

        sorted.forEach(r => {
            const tr = document.createElement('tr');
            
            const dodBadge = r.dod_change === 0 ? 
                `<span style="color: var(--text-muted); font-size:12px;">-</span>` : 
                (r.dod_change > 0 ? 
                    `<span style="color: var(--success); font-size:12px; font-weight:700;">▲ ${r.dod_pct}%</span>` : 
                    `<span style="color: var(--error); font-size:12px; font-weight:700;">▼ ${Math.abs(r.dod_pct)}%</span>`
                );

            tr.innerHTML = `
                <td style="font-weight: 600;">${r.date}</td>
                <td style="text-align: right; font-weight: 700;">${r.total_sales.toLocaleString()}원</td>
                <td style="text-align: right; color: var(--text-muted);">${r.hall_sales.toLocaleString()}원</td>
                <td style="text-align: right; color: var(--text-muted);">${r.baemin_delivery.toLocaleString()}원</td>
                <td style="text-align: right; color: var(--text-muted);">${r.baemin_pickup.toLocaleString()}원</td>
                <td style="text-align: right; color: var(--text-muted);">${r.coupang_eats.toLocaleString()}원</td>
                <td style="text-align: center;">${dodBadge}</td>
            `;
            body.appendChild(tr);
        });

        if (sorted.length === 0) {
            body.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 32px;">데이터가 존재하지 않습니다.</td></tr> animate-fade-in`;
        }
    }

    // 11. 대시보드 판매량 차트(그래프) 호버 마크업 활성화 및 초기 로딩
    initBeverageSelector();
    renderInventoryTable('', 'ALL');
});

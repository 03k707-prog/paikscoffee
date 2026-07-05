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

    // 사이드바 카테고리 링크 클릭 시 테이블 자동 필터링 매핑
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 사이드바 클릭 링크가 Inventory인 경우
            const text = link.querySelector('span:not(.nav-icon)').textContent.trim();
            if (text === 'Inventory') {
                e.preventDefault();
                categorySelect.value = 'ALL';
                renderInventoryTable('', 'ALL');
                // 스크롤 이동
                document.getElementById('inventory-section').scrollIntoView({ behavior: 'smooth' });
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

    // 10. 대시보드 판매량 차트(그래프) 호버 마크업 활성화 및 초기 로딩
    initBeverageSelector();
    renderInventoryTable('', 'ALL');
});

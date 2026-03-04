/**
 * 업데이트 히스토리 페이지
 * - 왜: 사이트의 "정기적 업데이트" 증거를 제공하여 애드센스 정책 준수
 * - 사용자가 재방문할 이유를 만드는 콘텐츠
 */

interface UpdateEntry {
    version: string
    date: string
    title: string
    changes: string[]
    type: 'major' | 'minor' | 'patch'
}

const UPDATE_LOG: UpdateEntry[] = [
    {
        version: '1.4.0',
        date: '2026-03-03',
        title: '콘텐츠 강화 및 사이트 구조 개선',
        type: 'minor',
        changes: [
            '스트리머 완벽 가이드 페이지 추가 (OBS 설정법, 플랫폼별 채팅 복사 요령)',
            '자주 묻는 질문(FAQ) 페이지 추가 (17개 항목)',
            '업데이트 히스토리 페이지 추가',
            'Home 페이지 콘텐츠 대폭 확장 (코인 푸셔 역사, 활용 시나리오, 시스템 요구사항)',
            '네비게이션 메뉴 개편 (가이드, FAQ, 업데이트 링크 추가)',
            'SEO 최적화: lang="ko" 속성 적용',
        ],
    },
    {
        version: '1.3.0',
        date: '2026-02-27',
        title: '블로그 콘텐츠 & 페이지네이션',
        type: 'minor',
        changes: [
            '블로그 페이지에 데이터 클리닝 팁 콘텐츠 대량 추가',
            '게시물 페이지네이션 기능 구현',
            '애드센스 정책 준수를 위한 콘텐츠 보강',
        ],
    },
    {
        version: '1.2.0',
        date: '2026-02-25',
        title: 'SEO 최적화 & 사이트맵',
        type: 'minor',
        changes: [
            'sitemap.xml 생성',
            'robots.txt 생성',
            'Google Search Console 등록 준비',
            'OG/Twitter 메타 태그 추가',
        ],
    },
    {
        version: '1.1.0',
        date: '2026-02-23',
        title: '광고 정책 준수 개선',
        type: 'minor',
        changes: [
            'Play 페이지에서 광고 미노출 처리',
            '콘텐츠가 부족한 페이지에서 광고 숨김 로직 추가',
            'Coming Soon 페이지 제거',
        ],
    },
    {
        version: '1.0.0',
        date: '2026-02-20',
        title: '레이아웃 리팩토링 & 안정화',
        type: 'major',
        changes: [
            '3D 게임 영역 높이 및 Leva 메뉴 위치 최적화',
            'Header 고정 네비게이션 구현',
            '일반 페이지 스크롤 기능 복원',
            'Play 페이지 전체화면 레이아웃 안정화',
        ],
    },
    {
        version: '0.9.0',
        date: '2026-02-19',
        title: '채팅 기반 코인 생성 시스템',
        type: 'major',
        changes: [
            '클릭/스페이스바 기반 → 채팅 참여 기반 코인 생성으로 전환',
            '채팅 패널(ChatPanel) UI 구현',
            '닉네임 자동 파싱 및 중복 제거 로직',
            '1인당 코인 수 설정 기능',
            '셔플 박스 → 퍼붓기 2단계 드롭 시스템',
        ],
    },
    {
        version: '0.8.0',
        date: '2026-02-15',
        title: '피버 모드 & 도네이션 피드',
        type: 'minor',
        changes: [
            '피버 게이지 UI 및 피버 모드 이펙트 추가',
            '실시간 도네이션 피드 UI 구현',
            '목표 베팅 금액 바 추가',
            '네온 사인 슬로건 순환 표시',
        ],
    },
    {
        version: '0.5.0',
        date: '2026-02-10',
        title: '3D 코인 푸셔 엔진 구현',
        type: 'major',
        changes: [
            'Three.js + React Three Fiber 기반 3D 렌더링 엔진 구축',
            'Rapier 물리 엔진으로 코인 충돌/미끄러짐 시뮬레이션',
            '아케이드 배경 (네온 바닥, 조명, 파티클)',
            '코인 메쉬 및 텍스처 디자인',
            '스테이지(무대) 및 푸셔 메카닉 구현',
        ],
    },
]

// 타입별 색상 매핑
const TYPE_COLORS: Record<UpdateEntry['type'], { bg: string; text: string; label: string }> = {
    major: { bg: 'rgba(255, 32, 128, 0.15)', text: '#FF2080', label: 'MAJOR' },
    minor: { bg: 'rgba(0, 255, 238, 0.15)', text: '#00FFEE', label: 'MINOR' },
    patch: { bg: 'rgba(255, 215, 0, 0.15)', text: '#FFD700', label: 'PATCH' },
}

export default function Updates() {
    return (
        <div className="page-container">
            <h1 style={{ color: '#00FFEE', fontSize: '2.2rem', textAlign: 'center', marginBottom: '0.5rem', fontFamily: '"Press Start 2P"' }}>
                업데이트 히스토리
            </h1>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>
                Star Coin Pusher 개발 일지 및 변경 내역
            </p>

            {/* ─── 기술 스택 소개 ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FFD700', borderBottom: '1px solid #FFD700', paddingBottom: '0.5rem' }}>
                    🛠️ 기술 스택
                </h2>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    스타 코인 푸셔는 아래의 최신 웹 기술들을 활용하여 개발되었습니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {[
                        { name: 'React 18', desc: 'UI 프레임워크', color: '#61DAFB' },
                        { name: 'Three.js', desc: '3D 렌더링 엔진', color: '#049EF4' },
                        { name: 'R3F', desc: 'React Three Fiber', color: '#FF6B6B' },
                        { name: 'Rapier', desc: '물리 시뮬레이션', color: '#FC8D62' },
                        { name: 'TypeScript', desc: '타입 안전성', color: '#3178C6' },
                        { name: 'Vite', desc: '고속 빌드 도구', color: '#646CFF' },
                    ].map(tech => (
                        <div key={tech.name} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: `1px solid ${tech.color}33` }}>
                            <strong style={{ color: tech.color }}>{tech.name}</strong>
                            <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '0.3rem' }}>{tech.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 버전 히스토리 타임라인 ─── */}
            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    📜 버전 히스토리
                </h2>

                {UPDATE_LOG.map((entry, idx) => (
                    <div key={entry.version} style={{
                        position: 'relative',
                        paddingLeft: '2rem',
                        paddingBottom: '2rem',
                        borderLeft: idx === UPDATE_LOG.length - 1 ? 'none' : '2px solid rgba(255,255,255,0.1)',
                        marginLeft: '0.5rem',
                    }}>
                        {/* 타임라인 점 */}
                        <div style={{
                            position: 'absolute',
                            left: '-6px',
                            top: '4px',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: idx === 0 ? '#00FFEE' : '#555',
                            border: '2px solid #1a1a2e',
                            boxShadow: idx === 0 ? '0 0 8px rgba(0, 255, 238, 0.5)' : 'none',
                        }} />

                        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px' }}>
                            {/* 버전 + 타입 배지 + 날짜 */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>v{entry.version}</span>
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: TYPE_COLORS[entry.type].bg,
                                    color: TYPE_COLORS[entry.type].text,
                                    letterSpacing: '1px',
                                }}>
                                    {TYPE_COLORS[entry.type].label}
                                </span>
                                <span style={{ color: '#888', fontSize: '0.85rem' }}>{entry.date}</span>
                            </div>

                            <h3 style={{ color: '#e0e0e0', fontWeight: 600, marginBottom: '0.8rem' }}>{entry.title}</h3>

                            <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8, color: '#bbb', margin: 0 }}>
                                {entry.changes.map((change, cIdx) => (
                                    <li key={cIdx}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </section>

            {/* ─── 향후 로드맵 ─── */}
            <section style={{ backgroundColor: 'rgba(128, 0, 255, 0.08)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(128, 0, 255, 0.2)' }}>
                <h2 style={{ color: '#8B5CF6', borderBottom: '1px solid rgba(128, 0, 255, 0.3)', paddingBottom: '0.5rem' }}>
                    🚀 향후 로드맵
                </h2>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    스타 코인 푸셔는 지속적으로 기능을 확장하고 있습니다. 아래는 향후 개발 예정인 기능들입니다.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    {[
                        { title: '🎨 스킨 시스템', desc: '다양한 코인 디자인과 스테이지 테마를 선택할 수 있는 커스터마이징 기능' },
                        { title: '🏆 랭킹 보드', desc: '떨어진 순서를 자동으로 집계하는 실시간 순위 표시 기능' },
                        { title: '🔗 API 연동', desc: '유튜브/트위치 채팅 API를 직접 연동하여 자동 코인 생성' },
                        { title: '🎵 사운드 이펙트', desc: '코인 충돌, 떨어짐, 피버 모드 등 각 상황에 맞는 효과음 추가' },
                    ].map(item => (
                        <div key={item.title} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                            <strong style={{ color: '#e0e0e0' }}>{item.title}</strong>
                            <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.3rem', lineHeight: 1.5 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ textAlign: 'center', color: '#666', borderTop: '1px solid #333', padding: '2rem 0', marginTop: '2rem' }}>
                <p>Copyright © 2026 Data Laundry & Antigravity AI. All rights reserved.</p>
            </footer>
        </div>
    )
}

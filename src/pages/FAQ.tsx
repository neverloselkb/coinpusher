import { useState } from 'react'
import GoogleAd from '../components/ui/GoogleAd'

/**
 * FAQ 페이지 - 자주 묻는 질문
 * - 왜: 사용자에게 실질적인 도움을 주는 독창적 콘텐츠 제공
 * - 아코디언 UI로 접기/펼치기 가능하여 사용자 경험 개선
 */

interface FAQItem {
    question: string
    answer: string
    category: 'general' | 'tech' | 'troubleshoot'
}

// 카테고리별로 구분된 FAQ 데이터
const FAQ_DATA: FAQItem[] = [
    // ─── 일반 질문 ───
    {
        category: 'general',
        question: '스타 코인 푸셔는 무료인가요?',
        answer: '네, 완전히 무료입니다. 별도의 결제나 인앱 구매 없이 모든 기능을 자유롭게 사용할 수 있습니다. 브라우저만 있으면 누구나 즉시 플레이할 수 있습니다.',
    },
    {
        category: 'general',
        question: '설치가 필요한가요?',
        answer: '아닙니다. 스타 코인 푸셔는 100% 웹 기반으로 동작합니다. 별도의 프로그램이나 앱을 설치할 필요가 없으며, 크롬(Chrome), 파이어폭스(Firefox), 엣지(Edge) 등 최신 웹 브라우저에서 URL만 입력하면 바로 실행됩니다.',
    },
    {
        category: 'general',
        question: '어떤 방송 플랫폼에서 사용할 수 있나요?',
        answer: '유튜브 라이브, 트위치(Twitch), 아프리카TV, 치지직(Chzzk) 등 모든 라이브 스트리밍 플랫폼에서 활용할 수 있습니다. 특정 플랫폼에 종속되지 않으며, 채팅 텍스트를 복사/붙여넣기 할 수 있는 환경이면 어디서든 사용 가능합니다.',
    },
    {
        category: 'general',
        question: '시청자가 몇 명일 때 가장 재미있나요?',
        answer: '10~30명 정도의 참여자가 있을 때 가장 적절합니다. 너무 적으면(<5명) 코인 밀어내기의 긴장감이 줄고, 너무 많으면(>50명) 코인이 과도하게 쌓여 성능이 저하될 수 있습니다. "1인당 코인 수" 설정을 조절하면 인원에 따라 유연하게 대응할 수 있습니다.',
    },
    {
        category: 'general',
        question: '개인 정보가 수집되나요?',
        answer: '스타 코인 푸셔는 사용자의 개인 정보를 수집하지 않습니다. 채팅에 입력된 닉네임은 브라우저 메모리에서만 일시적으로 사용되며, 서버로 전송되거나 저장되지 않습니다. 자세한 내용은 개인정보처리방침 페이지를 참고해주세요.',
    },
    {
        category: 'general',
        question: '모바일에서도 사용할 수 있나요?',
        answer: '기본적으로 모바일 브라우저에서도 접속은 가능하지만, 3D 렌더링 특성상 PC 환경에서 가장 원활하게 동작합니다. 스트리밍 방송에 활용할 때는 PC에서 사용하시는 것을 권장합니다.',
    },
    {
        category: 'general',
        question: '코인 푸셔에서 실제 돈이 걸리나요?',
        answer: '아닙니다. 스타 코인 푸셔는 순수한 엔터테인먼트 목적의 시뮬레이션 게임입니다. 실제 금전적 거래나 도박 요소가 전혀 없으며, 오직 방송 콘텐츠와 시청자 참여를 위한 도구입니다.',
    },
    {
        category: 'general',
        question: '상업적 방송에서도 사용해도 되나요?',
        answer: '네, 스타 코인 푸셔는 모든 라이브 스트리밍 환경에서 자유롭게 사용할 수 있습니다. 개인 방송, 기업 이벤트, 유료 구독 방송 등 어떤 형태의 방송에서든 별도 라이선스 없이 무료로 활용 가능합니다.',
    },

    // ─── 기술적 질문 ───
    {
        category: 'tech',
        question: '어떤 기술로 만들어졌나요?',
        answer: 'React + Three.js(React Three Fiber)를 기반으로 한 웹 3D 애플리케이션입니다. 물리 엔진은 @react-three/rapier(Rapier 물리 엔진)를 사용하여 실제 코인의 무게감과 충돌을 시뮬레이션합니다. Vite로 빌드되어 빠른 로딩 속도를 제공합니다.',
    },
    {
        category: 'tech',
        question: '어떤 브라우저를 지원하나요?',
        answer: 'WebGL 2.0을 지원하는 모든 최신 브라우저에서 동작합니다. 크롬(Chrome) 90+, 파이어폭스(Firefox) 78+, 엣지(Edge) 90+, 사파리(Safari) 15+를 공식 지원합니다. Internet Explorer는 지원하지 않습니다.',
    },
    {
        category: 'tech',
        question: 'OBS에서 브라우저 소스로 띄울 수 있나요?',
        answer: '네, OBS Studio의 "브라우저 소스"를 추가하고 URL란에 게임 주소를 입력하면 됩니다. 해상도는 1920×1080을 권장하며, CSS에 "body { background-color: rgba(0,0,0,0) !important; }"를 입력하면 배경이 투명하게 처리됩니다. 자세한 설정 가이드는 "스트리머 완벽 가이드" 페이지를 참고하세요.',
    },
    {
        category: 'tech',
        question: '최소 시스템 사양은 어떻게 되나요?',
        answer: 'WebGL 2.0을 지원하는 그래픽 카드가 필요하며, RAM 4GB 이상, 최신 버전의 브라우저를 권장합니다. 저사양 PC에서는 코인 수를 줄이면(1인당 1개) 원활하게 동작합니다. GPU가 내장된 일반적인 노트북에서도 충분히 구동됩니다.',
    },
    {
        category: 'tech',
        question: '소스코드가 공개되어 있나요?',
        answer: '네, 스타 코인 푸셔는 GitHub에서 소스코드를 확인하실 수 있습니다. 학습 목적의 참고는 자유이나, 상업적 복제는 제한됩니다.',
    },

    // ─── 트러블슈팅 ───
    {
        category: 'troubleshoot',
        question: '화면이 검은색으로만 나와요.',
        answer: '브라우저의 하드웨어 가속이 비활성화되어 있을 수 있습니다. 크롬 설정(chrome://settings/) → "시스템" → "사용 가능한 경우 그래픽 가속 사용"을 켜주세요. 그래픽 드라이버가 최신 버전인지도 확인해 보세요. 또한 시크릿 모드에서 테스트하면 확장 프로그램 충돌 여부를 확인할 수 있습니다.',
    },
    {
        category: 'troubleshoot',
        question: '프레임이 너무 낮아요 (끊겨요).',
        answer: '코인 수가 과도하게 많으면 프레임이 떨어질 수 있습니다. "1인당 코인 수"를 1개로 줄이거나, 한 번에 참여하는 인원을 30명 이하로 제한해보세요. 또한 해당 브라우저 탭 외 다른 무거운 탭(예: 다른 게임, 영상 편집기)을 닫으면 성능이 개선됩니다.',
    },
    {
        category: 'troubleshoot',
        question: '채팅을 붙여넣었는데 코인이 생성되지 않아요.',
        answer: '붙여넣은 텍스트에서 닉네임을 인식하지 못했을 수 있습니다. 채팅 형식이 "닉네임: 메시지" 또는 "닉네임 메시지" 형태인지 확인해주세요. 줄바꿈으로 구분된 여러 줄의 텍스트가 필요합니다. 한 줄만 입력하면 1명의 참여자만 인식됩니다.',
    },
    {
        category: 'troubleshoot',
        question: 'OBS 브라우저 소스에서 제대로 표시되지 않아요.',
        answer: 'OBS 브라우저 소스의 해상도가 너무 낮으면 3D가 제대로 렌더링되지 않을 수 있습니다. 너비 1920, 높이 1080 이상으로 설정해주세요. 또한 OBS의 브라우저 소스 속성에서 "페이지 권한" → "하드웨어 가속"이 켜져 있는지 확인하세요. OBS 버전이 28 이상이어야 최신 WebGL을 지원합니다.',
    },
]

// 카테고리 라벨 매핑
const CATEGORY_LABELS: Record<FAQItem['category'], { label: string; color: string }> = {
    general: { label: '💬 일반', color: '#00FFEE' },
    tech: { label: '⚙️ 기술', color: '#FFD700' },
    troubleshoot: { label: '🔧 트러블슈팅', color: '#FF2080' },
}

export default function FAQ() {
    // 각 질문의 열림/닫힘 상태를 관리
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    // 현재 선택된 카테고리 필터
    const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'all'>('all')

    const filteredFAQ = activeCategory === 'all'
        ? FAQ_DATA
        : FAQ_DATA.filter(item => item.category === activeCategory)

    return (
        <div className="page-container">
            <h1 style={{ color: '#00FFEE', fontSize: '2.2rem', textAlign: 'center', marginBottom: '0.5rem', fontFamily: '"Press Start 2P"' }}>
                자주 묻는 질문
            </h1>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem' }}>
                FAQ - Frequently Asked Questions
            </p>

            {/* 카테고리 필터 버튼 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setActiveCategory('all')}
                    style={{
                        padding: '0.5rem 1.2rem',
                        borderRadius: '20px',
                        border: activeCategory === 'all' ? '2px solid #00FFEE' : '1px solid #555',
                        backgroundColor: activeCategory === 'all' ? 'rgba(0, 255, 238, 0.15)' : 'rgba(255,255,255,0.05)',
                        color: activeCategory === 'all' ? '#00FFEE' : '#ccc',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                    }}
                >
                    전체 ({FAQ_DATA.length})
                </button>
                {(Object.keys(CATEGORY_LABELS) as FAQItem['category'][]).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: '20px',
                            border: activeCategory === cat ? `2px solid ${CATEGORY_LABELS[cat].color}` : '1px solid #555',
                            backgroundColor: activeCategory === cat ? `${CATEGORY_LABELS[cat].color}22` : 'rgba(255,255,255,0.05)',
                            color: activeCategory === cat ? CATEGORY_LABELS[cat].color : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                        }}
                    >
                        {CATEGORY_LABELS[cat].label} ({FAQ_DATA.filter(i => i.category === cat).length})
                    </button>
                ))}
            </div>

            {/* FAQ 아코디언 목록 */}
            <div style={{ marginBottom: '2rem' }}>
                {filteredFAQ.map((item, idx) => {
                    // 전체 목록에서의 실제 인덱스를 찾아 열림/닫힘 관리
                    const globalIdx = FAQ_DATA.indexOf(item)
                    const isOpen = openIndex === globalIdx

                    return (
                        <div
                            key={globalIdx}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                marginBottom: '0.8rem',
                                overflow: 'hidden',
                                border: isOpen ? '1px solid rgba(0, 255, 238, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                                transition: 'border-color 0.3s',
                            }}
                        >
                            {/* 질문 헤더 (클릭으로 토글) */}
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                }}
                            >
                                {/* 카테고리 뱃지 */}
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    backgroundColor: `${CATEGORY_LABELS[item.category].color}22`,
                                    color: CATEGORY_LABELS[item.category].color,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {CATEGORY_LABELS[item.category].label}
                                </span>
                                <span style={{ flex: 1 }}>Q{idx + 1}. {item.question}</span>
                                <span style={{ color: '#00FFEE', fontSize: '1.2rem', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                                    ▼
                                </span>
                            </button>

                            {/* 답변 (열렸을 때만 표시) */}
                            {isOpen && (
                                <div style={{ padding: '0 1.5rem 1.5rem', color: '#e0e0e0', lineHeight: 1.8, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <p style={{ marginTop: '1rem' }}>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* 추가 질문 안내 */}
            <section style={{ backgroundColor: 'rgba(255, 215, 0, 0.08)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                <h3 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>찾는 답변이 없으신가요?</h3>
                <p style={{ color: '#e0e0e0', lineHeight: 1.6 }}>
                    위 목록에서 원하는 답변을 찾지 못하셨다면, GitHub Issues를 통해 질문해 주세요.
                    커뮤니티 멤버나 개발진이 빠르게 답변해 드립니다.
                </p>
            </section>

            {/* 하단 광고 1개 - 충분한 콘텐츠 이후 배치 */}
            <div style={{ margin: '2rem auto', maxWidth: '728px' }}>
                <GoogleAd style={{ display: 'block' }} format="auto" responsive="true" />
            </div>

            <footer style={{ textAlign: 'center', color: '#666', borderTop: '1px solid #333', padding: '2rem 0', marginTop: '2rem' }}>
                <p>Copyright © 2026 Data Laundry & Antigravity AI. All rights reserved.</p>
            </footer>
        </div>
    )
}

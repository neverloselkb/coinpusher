import GoogleAd from '../components/ui/GoogleAd'

/**
 * 스트리머 완벽 가이드 페이지
 * - 왜: 사이트의 핵심 콘텐츠 페이지로, 코인 푸셔 활용법을 상세히 안내
 * - 애드센스 정책상 "사용자가 방문하고 돌아올 이유"를 제공하는 독창적 콘텐츠
 */
export default function Guide() {
    return (
        <div className="page-container">
            <h1 style={{ color: '#00FFEE', fontSize: '2.2rem', textAlign: 'center', marginBottom: '0.5rem', fontFamily: '"Press Start 2P"' }}>
                스트리머 완벽 가이드
            </h1>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>
                Star Coin Pusher를 방송에서 200% 활용하는 법
            </p>

            {/* ─── 1. 게임 방법 상세 ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>
                    🎮 게임 방법 상세 가이드
                </h2>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    스타 코인 푸셔는 아케이드 오락실에서 볼 수 있었던 <strong>"메달 밀어내기(코인 도저)"</strong> 게임을
                    웹 3D로 구현한 시청자 참여형 게임입니다. 실제 오락실 기계와 동일하게, 위에서 떨어진 코인이
                    기존에 쌓여 있던 코인을 밀어내고, 가장자리로 떨어지는 코인이 승자가 됩니다.
                </p>

                <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Step 1. 오락실 입장</h3>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                    상단 메뉴의 <strong>"오락실 입장"</strong> 버튼을 클릭하면 네온 불빛이 빛나는 3D 코인 푸셔 화면이 로딩됩니다.
                    WebGL을 지원하는 모든 브라우저에서 동작하며, 별도의 플러그인이나 설치가 필요 없습니다.
                </p>

                <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Step 2. 채팅 로그 붙여넣기</h3>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                    좌측 하단의 <strong>"스타 코인 생성기"</strong> 패널에 유튜브·트위치·아프리카TV 등의 라이브 채팅 텍스트를
                    그대로 복사해서 붙여넣습니다. 시스템이 자동으로 참여자 이름을 파싱하고 중복을 제거합니다.
                </p>
                <ul style={{ lineHeight: 1.8, color: '#e0e0e0', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li><strong>유튜브 라이브</strong>: 채팅창에서 여러 줄을 드래그 → 복사(Ctrl+C) → 생성기에 붙여넣기(Ctrl+V)</li>
                    <li><strong>트위치</strong>: 채팅 로그를 복사하여 동일하게 붙여넣기</li>
                    <li><strong>아프리카TV</strong>: 채팅 내용을 텍스트로 복사 후 붙여넣기</li>
                </ul>

                <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Step 3. 코인 생성 & 퍼붓기</h3>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                    <strong>"코인 생성"</strong> 버튼을 누르면 참여자 수만큼 코인이 셔플 박스에 담깁니다.
                    이어서 <strong>"퍼붓기"</strong> 버튼을 누르면 박스가 기울어지며 코인이 쏟아져 내려옵니다.
                    물리 엔진이 적용되어 코인끼리 부딪히고, 밀리고, 미끄러지는 현실감 있는 움직임을 제공합니다.
                </p>

                <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Step 4. 결과 확인</h3>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                    가장 먼저 무대 아래로 떨어진 코인의 주인이 <strong>1등</strong>입니다!
                    우측의 도네이션 피드에서 결과를 실시간으로 확인할 수 있습니다.
                    "피버 게이지"가 가득 차면 특별한 이펙트와 함께 보너스 코인이 투입됩니다.
                </p>
            </section>

            {/* ─── 2. OBS 브라우저 소스 설정법 ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>
                    📡 OBS 브라우저 소스 설정법
                </h2>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    OBS(Open Broadcaster Software)를 사용하여 방송 화면에 코인 푸셔를 오버레이하는 방법입니다.
                    이 설정을 통해 시청자들이 방송 화면에서 직접 코인이 떨어지는 것을 볼 수 있습니다.
                </p>

                <ol style={{ lineHeight: 2, color: '#e0e0e0', paddingLeft: '1.5rem', marginTop: '1rem' }}>
                    <li>OBS를 열고 <strong>"소스"</strong> 패널에서 <strong>"+"</strong> 버튼을 클릭합니다.</li>
                    <li><strong>"브라우저"</strong>를 선택하고 이름을 "코인 푸셔"로 지정합니다.</li>
                    <li>URL에 <code style={{ color: '#00FFEE', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>https://coinpusher.pages.dev/#/play</code> 를 입력합니다.</li>
                    <li>너비를 <strong>1920</strong>, 높이를 <strong>1080</strong>으로 설정합니다. (방송 해상도에 맞춤)</li>
                    <li><strong>"사용자 지정 CSS"</strong> 란에 아래 코드를 입력하면 배경이 투명해집니다:
                        <pre style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem', overflowX: 'auto' }}>
                            <code style={{ color: '#00FFEE' }}>{`body { background-color: rgba(0,0,0,0) !important; }`}</code>
                        </pre>
                    </li>
                    <li><strong>"확인"</strong>을 누르고, 소스의 크기와 위치를 조절합니다.</li>
                </ol>

                <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                    <p style={{ color: '#FFD700', margin: 0 }}>
                        💡 <strong>팁</strong>: 게임 화면 위에 OBS 소스를 배치하면, 게임 플레이 중에 코인이 떨어지는 오버레이 효과를 연출할 수 있습니다.
                        "채팅 참여 = 코인 드롭"이라는 직관적인 규칙이 시청자 참여율을 크게 높여줍니다.
                    </p>
                </div>
            </section>

            {/* ─── 3. 전략 및 팁 ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>
                    💡 전략 및 활용 팁
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ backgroundColor: 'rgba(0, 255, 238, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0, 255, 238, 0.2)' }}>
                        <h3 style={{ color: '#00FFEE', marginBottom: '0.5rem' }}>🎯 최적 인원수</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            <strong>10~30명</strong> 정도가 가장 적절합니다. 너무 적으면 밀어내기의 재미가 줄고,
                            너무 많으면 코인이 과도하게 쌓여 프레임이 떨어질 수 있습니다.
                            "1인당 코인 수" 설정을 활용하여 인원에 맞게 조절하세요.
                        </p>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255, 32, 128, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 32, 128, 0.2)' }}>
                        <h3 style={{ color: '#FF2080', marginBottom: '0.5rem' }}>⏱️ 타이밍</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            한 번에 모든 코인을 퍼붓기보다, <strong>2~3회에 나누어</strong> 퍼부으면
                            더 드라마틱한 연출이 가능합니다. 첫 번째 퍼붓기로 기반을 쌓고,
                            두 번째로 밀어내는 전략이 효과적입니다.
                        </p>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                        <h3 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>🔥 피버 모드 활용</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            좌측의 <strong>피버 게이지</strong>가 가득 차면 화려한 이펙트와 함께
                            보너스 코인이 추가됩니다. 시청자들의 환호를 유도하는 핵심 연출 포인트입니다.
                            "목표 베팅 금액" 바를 설정하면 목표치 달성 시 자동으로 피버가 발동합니다.
                        </p>
                    </div>

                    <div style={{ backgroundColor: 'rgba(128, 0, 255, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(128, 0, 255, 0.2)' }}>
                        <h3 style={{ color: '#8B5CF6', marginBottom: '0.5rem' }}>📺 방송 활용 아이디어</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            • <strong>뽑기 대용</strong>: "!참여" 명령어로 채팅 참여자 코인 생성<br />
                            • <strong>이벤트 추첨</strong>: 가장 먼저 떨어진 코인의 주인이 당첨<br />
                            • <strong>벌칙 게임</strong>: 마지막까지 남은 코인의 주인이 벌칙 수행<br />
                            • <strong>쉬는 시간 콘텐츠</strong>: 잠깐 자리를 비울 때 시청자끼리 플레이
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── 4. 플랫폼별 채팅 복사 팁 ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>
                    📋 플랫폼별 채팅 복사 요령
                </h2>

                <div style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ color: '#FF0000', marginBottom: '0.5rem' }}>▶️ 유튜브 라이브</h3>
                    <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                        유튜브 라이브 채팅창의 메시지를 마우스로 여러 줄 드래그하여 선택한 뒤, <code style={{ color: '#00FFEE' }}>Ctrl+C</code>로 복사합니다.
                        유튜브 채팅은 <strong>"닉네임: 메시지"</strong> 형식으로 복사되므로, 콜론(:) 앞의 닉네임이 자동으로 파싱됩니다.
                        TIP: 팝아웃 채팅창을 사용하면 더 많은 채팅을 한 번에 복사할 수 있습니다.
                    </p>

                    <h3 style={{ color: '#9146FF', marginTop: '1.5rem', marginBottom: '0.5rem' }}>🟣 트위치</h3>
                    <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                        트위치 채팅은 기본적으로 드래그 복사가 가능합니다. 채팅 영역을 선택하고 복사하면
                        <strong>"닉네임: 메시지"</strong> 형식으로 클립보드에 담깁니다.
                        BTTV(BetterTTV)나 FFZ 확장 프로그램을 사용 중이라면 채팅 로그 내보내기 기능도 활용 가능합니다.
                    </p>

                    <h3 style={{ color: '#0066FF', marginTop: '1.5rem', marginBottom: '0.5rem' }}>🔵 아프리카TV</h3>
                    <p style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                        아프리카TV 채팅창에서 텍스트를 선택하여 복사합니다. 닉네임과 메시지가 함께 복사되며,
                        시스템이 자동으로 닉네임을 추출합니다. 채팅 속도가 빠를 경우 모아서 한 번에 붙여넣으면 편리합니다.
                    </p>
                </div>
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

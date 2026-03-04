import { NavLink } from 'react-router-dom'

/**
 * Header - 전체 사이트 네비게이션
 * - 왜: 애드센스 정책상 "접근 가능하고 사용하기 쉬운 네비게이션" 필수
 * - 주요 콘텐츠 페이지로의 링크를 명확히 제공
 */
export default function Header() {

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: 'rgba(5, 0, 18, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 32, 128, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            zIndex: 100, // 게임 캔버스나 UI 보다 항상 위에 오도록
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: '"Press Start 2P", "Orbitron", sans-serif',
                fontWeight: 900,
                color: '#fff',
                fontSize: '16px',
                letterSpacing: '1px',
                textShadow: '0 0 10px rgba(0, 255, 238, 0.5)',
                textDecoration: 'none',
            }}>
                <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <span style={{ color: '#00FFEE' }}>STAR</span> COIN PUSHER
                </NavLink>
            </div>

            <nav style={{
                display: 'flex',
                gap: '20px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
            }}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        color: isActive ? '#00FFEE' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    })}
                >
                    홈
                </NavLink>
                <NavLink
                    to="/play"
                    style={({ isActive }) => ({
                        color: isActive ? '#FF2080' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        textShadow: isActive ? '0 0 8px rgba(255, 32, 128, 0.8)' : 'none',
                    })}
                >
                    오락실 입장
                </NavLink>
                <NavLink
                    to="/guide"
                    style={({ isActive }) => ({
                        color: isActive ? '#FFD700' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    })}
                >
                    가이드
                </NavLink>
                <NavLink
                    to="/faq"
                    style={({ isActive }) => ({
                        color: isActive ? '#00FFEE' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    })}
                >
                    FAQ
                </NavLink>
                <NavLink
                    to="/updates"
                    style={({ isActive }) => ({
                        color: isActive ? '#8B5CF6' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    })}
                >
                    업데이트
                </NavLink>
                <NavLink
                    to="/privacy"
                    style={({ isActive }) => ({
                        color: isActive ? '#888' : '#666',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        fontSize: '0.8rem',
                    })}
                >
                    개인정보
                </NavLink>
            </nav>
        </header>
    )
}

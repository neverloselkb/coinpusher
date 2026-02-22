import { NavLink } from 'react-router-dom'

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
                gap: '24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
            }}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        color: isActive ? '#00FFEE' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    })}
                >
                    홈 소개
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
                    to="/privacy"
                    style={({ isActive }) => ({
                        color: isActive ? '#FFD700' : '#ccc',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    })}
                >
                    개인정보처리방침
                </NavLink>
            </nav>
        </header>
    )
}

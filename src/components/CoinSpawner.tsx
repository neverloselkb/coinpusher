import { useState, useEffect, useRef } from 'react'
import { useControls } from 'leva'
import Coin from './Coin'

interface CoinSpawnerProps {
    /** 코인을 생성할 참여자 이름 목록 (중복 제거된 상태) */
    participants: string[]
    /** 참여자 1인당 생성할 코인 수 */
    coinsPerPerson: number
    /** 코인 낙하 시 타입과 이름을 전달하는 콜백 */
    onCoinFall?: (type: 'silver' | 'gold', name: string) => void
}

interface CoinData {
    id: number
    name: string
    position: [number, number, number]
    type: 'silver' | 'gold'
}

export default function CoinSpawner({ participants, coinsPerPerson, onCoinFall }: CoinSpawnerProps) {
    const [coins, setCoins] = useState<CoinData[]>([])
    // 직전에 처리한 launch 식별자 (같은 participants 배열이 두 번 effect를 타지 않게 방지)
    const lastLaunchKey = useRef('')

    // ====== Leva 패널 - 코인 크기 컨트롤 ======
    const { goldRadius, silverRadius } = useControls('Coin Size', {
        goldRadius: { value: 1.3, min: 0.3, max: 4.0, step: 0.1, label: '금화 크기' },
        silverRadius: { value: 1.0, min: 0.3, max: 4.0, step: 0.1, label: '은화 크기' },
    })

    // ====== Leva 패널 - 코인 설정 ======
    const { goldChance } = useControls('Coin Settings', {
        goldChance: { value: 5, min: 0, max: 100, step: 1, label: '금화 확률 (%)' },
    })

    // participants 배열이 바뀌면(=새로운 launch) 코인 일괄 생성
    useEffect(() => {
        if (participants.length === 0) return

        // 같은 launch를 두 번 처리하지 않도록 key 확인
        const key = participants.join('|') + ':' + coinsPerPerson
        if (key === lastLaunchKey.current) return
        lastLaunchKey.current = key

        const newCoins: CoinData[] = []

        participants.forEach(participantName => {
            for (let i = 0; i < coinsPerPerson; i++) {
                const isGold = Math.random() * 100 < goldChance
                const type: 'silver' | 'gold' = isGold ? 'gold' : 'silver'

                // 여러 개일 때는 "홍길동 #1" 형태, 1개면 이름 그대로
                const coinName = coinsPerPerson > 1
                    ? `${participantName} #${i + 1}`
                    : participantName

                newCoins.push({
                    id: Math.random(),
                    name: coinName,
                    position: [
                        (Math.random() - 0.5) * 14,   // X: 스테이지 폭 안쪽
                        12 + Math.random() * 4,        // Y: 높이 랜덤 (겹침 방지)
                        -13 + Math.random() * 7        // Z: 막대 뒤쪽
                    ],
                    type,
                })
            }
        })

        // 한꺼번에 추가하되, 시간 차를 두어 물리 엔진 부하를 줄임
        // (너무 많은 코인이 동시에 생기면 프레임 드랍 발생)
        newCoins.forEach((coin, idx) => {
            setTimeout(() => {
                setCoins(prev => [...prev, coin])
            }, idx * 80)  // 80ms 간격으로 순차 생성
        })
    }, [participants, coinsPerPerson])   // goldChance는 launch 시점 값을 캡처하므로 deps 제외

    return (
        <>
            {coins.map(coin => (
                <Coin
                    key={coin.id}
                    position={coin.position}
                    type={coin.type}
                    name={coin.name}
                    radius={coin.type === 'gold' ? goldRadius : silverRadius}
                    onFall={onCoinFall}
                />
            ))}
        </>
    )
}

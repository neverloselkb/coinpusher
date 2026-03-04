import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Play from './pages/Play'
import Guide from './pages/Guide'
import FAQ from './pages/FAQ'
import Updates from './pages/Updates'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="play" element={<Play />} />
                    <Route path="guide" element={<Guide />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="updates" element={<Updates />} />
                    <Route path="privacy" element={<PrivacyPolicy />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App

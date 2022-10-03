import { useNavigate } from "react-router"
import { Text32Dark, Text32White, Title2White, Title3White, TitleWhite } from "../../shared/components/Label/Label"
import './StaticPage.css'

export const StaticPage = () => {
    const navigate = useNavigate();
    return (
        <div className="tl-bg">
            <div className="static-cell">
                <Title3White title={'Version'} />
                <Text32White text={'1.0.1'} />
            </div>
            <div className="static-cell">
                <Title3White title={'About Us'} />
                <Text32White text={'TokTok is a social media platform that aims to connect people with their lovely products. In TokTok, you can share photos or videos and also share your catalog if you run a busniness account. We care about how business owners engage people with your products, so we create a fresh look on your profile to have all the info needed for the customers to come! All in one that easy in TokTok, start explore now!'} />
            </div>
            <div className="static-cell">
                <Title3White title={'Contact Us'} />
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <Text32White text={'Phone Number: '} />
                    <div>
                        <Text32White text={'+62 812345678910'} />

                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <Text32White text={'e-mail: '} />
                    <div>
                        <Text32White text={'toktok@email.com'} />

                    </div>

                </div>
            </div>
            <div className="static-cell static-click" onClick={_ => navigate('/ongoing')}>
                <Title3White title={'How to Use'} />
            </div>
        </div>
    )
}
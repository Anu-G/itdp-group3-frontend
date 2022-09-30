import { Text32Dark, Text32White, Title2White, Title3White, TitleWhite } from "../../shared/components/Label/Label"
import './StaticPage.css'

export const StaticPage = () => {
    return(
        <div className="tl-bg">
        <div className="static-cell">
            <Title3White title={'Version'} />
            <Text32White text={'version sekian sekian'} />
        </div>
        <div className="static-cell">
            <Title3White title={'About Us'} />
            <Text32White text={'TokTok is a blablabla. It was a simple green chair. There was nothing extraordinary about it or so it seemed. It was the type of chair one would pass without even noticing it was there, let alone what the actual color of it was. It was due to this common and unassuming appearance that few people actually stopped to sit in it and discover its magical powers.'} />
        </div>
        <div className="static-cell">
            <Title3White title={'Contact Us'} />
            <div style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                <Text32White text={'Phone Number: '} />
                <div>
                    <Text32White text={'+62 812345678910'} />

                </div>

            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
                <Text32White text={'e-mail: '} />
                <div>
                    <Text32White text={'toktok@email.com'} />

                </div>

            </div>
        </div>
        <div className="static-cell">
            <Title3White title={'Terms and Privacy Policy'} />
        </div>
        </div>
    )
}
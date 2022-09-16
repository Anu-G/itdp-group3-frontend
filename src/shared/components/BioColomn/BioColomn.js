import { Title3White } from '../Label/Label';
import './BioColomn.css'

export const BioColomn = ({ label, maxLength, charLength, handleChange, charLimitHandle, value }) => {

    const handleOnChange = (e) => {
        if (e.target.value.length <= maxLength) {
            handleChange(e)           
        }
    }

    return (
        <div className='bio-wrp'>
            <Title3White title={label} />
            <div className='bio-box'>
                <textarea className='text-area-bio' onChange={handleOnChange} onKeyDown={charLimitHandle} value={value} />
                <div className='char-length'>
                    {charLength}/{maxLength}
                </div>
            </div>
        </div>
    )
}

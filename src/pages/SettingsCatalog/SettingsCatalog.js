import React from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button';
import './SettingsCatalog.css';

export const SettingsCatalog = () => {
  return (
    <div className='wrapper'>
        <div className='settings-catalog-card'>
            <div className='add-product-button'>
                <ButtonComponent label={"Add Product"}/>
            </div>

            <div className='wrapper-product-catalog-card'>
                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>
            </div>

            <div className='wrapper-product-catalog-card'>
                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>

                <div className='product-catalog-card'>
                    <img src=""/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

import React from 'react';
import { ButtonComponent } from '../../shared/components/Button/Button';
import { CatalogPage } from '../CategorizePage/CatalogPage/CatalogPage';
import './SettingsCatalog.css';

export const SettingsCatalogEX = () => {
    return (
        <div className='wrapper'>
            <div className='settings-catalog-card'>
                <div className='add-product-button'>
                    <ButtonComponent label={"Add Product"} />
                </div>

                <CatalogPage />

            </div>
        </div>
    )
}

import React from "react";

const DetailItem = ({ detailItemData }) => {
    return (
        <div>
            <div>
                название:  <b>{detailItemData.description}</b>
            </div>
            <div>
                ед.изм.: <b>{detailItemData.quantity}</b>
            </div>
            <div>
                цена розн: <b>{detailItemData.price_one}</b>
            </div>
            <div>
                цена опт: <b>{detailItemData.price_lot}</b>
            </div>
            <div>
                объём опта: <b>{detailItemData.volume}</b>
            </div>
            <div>
                компания: <b>{detailItemData.company}</b>
            </div>
            <div>
                телефон: <b>{detailItemData.phone}</b>
            </div>
        </div>
    )
}

export default DetailItem;
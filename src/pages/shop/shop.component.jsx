import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Route} from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage =({match}) =>{
console.log(match.path)
   return     (
        <div className='shop-page'>
        <Route exact path={`${match.path}`}
        component={CollectionsOverview}
        ></Route>
        <Route path={`${match.path}/:collectionId`}
        component={CollectionPage}
        ></Route>
        </div>
);
}

export default ShopPage;
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from './util/hook';
import { ApiResponeCollection, ApiResponeSwiper } from './util/api-response';
import { GetSwiperData } from './access/swiper-access';
import { getDataCollection } from './access/collection-access';
import { Ecommerce } from './page/ecommerce';
import { Navbar } from './component/navbar';
import { Sidebar } from './component/sidebar';
import { CollectionDetail } from './page/collection-detail';
import {Footer} from './component/footer/footer';
import { Notfound } from './page/page-not-found';
import { CreateItem } from './page/create';
import { EditItem } from './page/editItem';
import { YourCollection } from './page/your-collection';
import './index.scss'
import { Collection, FirstPageCollection } from './page/create-collection';

function App() {
  const dispatch = useAppDispatch()
  const { addnew} = useTypedSelector((state) => state.dataCollection)
  const { requestLoading } = useTypedSelector((state) => state.stateReducer)

  useEffect(() => {
    dispatch(getDataCollection(addnew))
  }, [ApiResponeCollection, addnew, requestLoading])

  useEffect(() => {
    dispatch(GetSwiperData())
  },[ApiResponeSwiper])
  return (
    <div className='main-app'>
      <BrowserRouter>
        <Navbar />
        <main className='class-main'>
          <div className='class-main content'>
            <div className='class-grid'>
              <div className='bg-image'>
                <Routes>
                  <Route path='/' element={<Ecommerce />} />
                  <Route path='/my-collection' element={<FirstPageCollection />} />
                  <Route path='/create-collection' element={<Collection />} />
                  <Route path='/ecommerce' element={<Ecommerce />} />
                  <Route path='/create' element={<CreateItem />} />
                  <Route path='/your-collection/:_id' element={<YourCollection />} />
                  <Route path='/Item/:_id' element={<CollectionDetail />} />
                  <Route path='/edit/:_id' element={<EditItem />} />
                  <Route path='*' element={<Notfound />} />
                </Routes>
              </div>
            </div>
            <Sidebar />
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../util/hook'
import { actionType } from '../../util/store/action'
import { TbListDetails } from 'react-icons/tb'
import { BsCheck2Circle, BsSearch, BsCartCheckFill } from 'react-icons/bs'
import { BiChevronDown, BiTable } from 'react-icons/bi'
import { MdCompare, MdAddShoppingCart } from 'react-icons/md'
import { LoadingFrame } from '../../component/loading'
import './table.scss'

export function TableCollection({ nfts, links, linkDetail }: any) {
  const dispatch = useAppDispatch()

  const { loadingCollection, requestLoading } = useTypedSelector((state: any) => state.stateReducer)

  const [paramsRouter, setParamsRouter] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [nftQty, setNftQty] = useState<any>([])

  const addToCart = (item: any) => {
    const exist = nfts.find((x: any) => x._id === item._id)
    if (exist) {
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: {key: "add", value: exist}
      })
      setNftQty(
        nfts.filter((x: any) =>
          x._id === item._id ? { ...exist, cart: exist.cart = true } : x
        )
      )
    }
  }

  const removeCart = (item: any) => {
    const exist = nfts.find((x: any) => x._id === item._id)
    if (exist) {
      dispatch({
        type: actionType.SET_SHOPPING_CART,
        shoppingCart: {key: "remove", value: exist}
      })
      setNftQty(
        nfts.filter((x: any) =>
          x._id === item._id ? { ...exist, cart: exist.cart = false } : x
        )
      )
    }
  }

  console.log(nfts)
  useEffect(() => {
    setParamsRouter(nftQty.filter((ele: any) => (
      ele.qty === true
    )).map((ele: any) => (
      ele._id
    )))
  }, [nftQty])

  console.log(nfts)

  return (
    <>
      <div className='asset-search-view-main' style={{marginTop:"0px"}}>
        <div className='asset-search-view-result'>
          <div className='asset-search-view-assets'>
            <div className='fresnel-greater-sm'>
              <div className='asset-view'>
                <div className='table-grid-item'>
                  <div className='table-items'>
                    {
                      loadingCollection === true
                        ?
                        <LoadingFrame divHeight="380px" divWidth="285px" borderRadius="10px" />
                        :
                        <>
                          {nfts?.map((ele: any) => (
                            <div className='item'>
                              <img src={ele.nftImage} alt='' />
                              <div className={ele.qty === true || ele.cart === true
                                ?
                                'shadow-content active'
                                :
                                'shadow-content'
                              }>
                                <div className='flex-item'>
                                  <span>
                                    {ele.nftName} #{ele._id}
                                    <br />
                                    {ele.nftOwner}
                                  </span>
                                </div>
                                <div className='flex-item bottom'>
                                  <div className='flex-offer'>
                                    <span className='span-price'>{ele.nftPrice} ETH</span>
                                  </div>
                                  <div className='flex-offer right'>
                                    {
                                      ele.cart === false
                                        ?
                                        <button type='button' className='button-add' onClick={() => addToCart(ele)}>
                                          <MdAddShoppingCart />
                                        </button>
                                        :
                                        <button type='button' className='button-add active' onClick={() => removeCart(ele)}>
                                          <BsCartCheckFill />
                                        </button>
                                    }
                                    <Link to={`/${linkDetail}/${ele._id}`}>
                                      <button type='button' className='button-add'>
                                        <TbListDetails />
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                    }

                    {loading === true || requestLoading === true && <LoadingFrame divHeight="380px" divWidth="277px" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

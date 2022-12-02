import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { TbCurrencyEthereum } from 'react-icons/tb'
import { SiWebmoney, SiDiscord, } from 'react-icons/si'
import { FiInstagram, FiTwitter } from 'react-icons/fi'
import { AiOutlineStar, AiOutlineShareAlt } from 'react-icons/ai'
import { BsThreeDots, BsPatchCheckFill } from 'react-icons/bs'
import { LoadingFrame } from '../../component/loading'
import { Modal } from '../../component/message-modal'
import { RequestModal } from '../../component/request-modal'
import { ToastMessage } from '../../component/toast-message'
import { TableCollection } from '../../component/type-table-collection'
import './your-collection.scss'
import { useAppDispatch, useTypedSelector } from '../../util/hook'
import { loadNFTs } from '../../access/your-collection'

export function YourCollection() {
    const dispatch = useAppDispatch()

    const { dataCollection } = useTypedSelector((state: any) => state.dataCollection)
    const { nfts } = useTypedSelector((state: any) => state.yourCollectionRedux)
    const { loadingYourCollection, requestLoading, googleStatus } = useTypedSelector((state: any) => state.stateReducer)

    const {_id} = useParams()

    const filData = dataCollection.filter((ele: any) => ele.address === _id)
    const yourCollection = filData[0]

    useEffect(() => {
        return () => {
            dispatch(loadNFTs())
        }
    }, [_id, requestLoading])

    console.log(nfts)

    return (
        <main className='main-class'>
            {googleStatus === false && <Modal />}
            {requestLoading === true && <RequestModal />}
            <ToastMessage keyMessage={"createItem"} />
            <div className='class-poster-outer'>
                <div className='class-poster-inner'>
                    <span className='span-poster'>
                        <img className='img-poster' src={yourCollection?.banner} alt='' />
                    </span>
                </div>
            </div>
            <div className='class-avatar'>
                <div className='class-avatar-outer'>
                    <div className='box-avatar'>
                        <div className='avatar-inline'>
                            <button type='button' className='button-avatar'>
                                <img src={yourCollection?.logo} alt='' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='class-info-main'>
                <div className='info-main-left'>
                    <div className='info-left-outer'>
                        <div className='fresnel-container'>
                            <h1>{yourCollection?.username}</h1>
                        </div>
                    </div>
                </div>
                <div className='info-main-right'>
                    <div className='fresnel-container'>
                        <div className='list-items-info'>
                            <div className='fresnel-container'>
                                <div className='list-items-info'>
                                    <div className='list-items'>
                                        <button className='item'>
                                            <TbCurrencyEthereum />
                                        </button>
                                        <button className='item'>
                                            <SiWebmoney />
                                        </button>
                                        <button className='item'>
                                            <SiDiscord />
                                        </button>
                                        <button className='item'>
                                            <FiInstagram />
                                        </button>
                                        <button className='item'>
                                            <FiTwitter />
                                        </button>
                                    </div>
                                    <div className='line'></div>
                                </div>
                            </div>
                            <div className='list-items-share'>
                                <div className='class-flex-3'>
                                    <button className='item'>
                                        <AiOutlineStar />
                                    </button>
                                    <button className='item'>
                                        <AiOutlineShareAlt />
                                    </button>
                                    <button className='item'>
                                        <BsThreeDots />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className='span-flex'>
                <p>By</p>
                <span>{yourCollection?.address}</span>

                <BsPatchCheckFill style={{ color: "#2081e2" }} />
            </span>
            <div className='flex-items'>
                <span><p>Items</p>{dataCollection.length}</span>
                <span>
                    <p>Created</p>
                    {new Date(yourCollection?.address).toDateString()}
                </span>
                <span><p>Creation fee</p>5 % </span>
                <span><p>Chain</p>{yourCollection?.blockchain}</span>
            </div>
            <div className='flex-items'>
                {
                    loadingYourCollection === true || googleStatus === false
                        ?
                        <LoadingFrame divWidth="736px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                        :
                        <span style={{ fontWeight: '400' }}>
                            Lorem
                        </span>
                }
            </div>
            <div className='flex-items'>
                <span className='column'>
                    {
                        loadingYourCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            " 354,925 ETH"
                    }

                    <p>Volume total</p></span>
                <span className='column'>
                    {
                        loadingYourCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            "0.939 ETH"
                    }
                    <p>Floor price</p>
                </span>
                <span className='column'>
                    {
                        loadingYourCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            "4%"
                    }
                    <p>Listed</p></span>
                <span className='column'>
                    {
                        loadingYourCollection === true || googleStatus === false
                            ?
                            <LoadingFrame divWidth="80px" divHeight="30px" borderRadius="4px" maxDivWidth="100%" />
                            :
                            " 0.886 WETH"
                    }
                    <p>Best offer</p></span>
            </div>
            <div className='flex-items'>
                <ul className='collection-nav-ul'>
                    <div className='collection-list-li'>
                        <li className='collection-nav-li'>
                            <a className='collection-nav-a active'>
                                <span>Elements</span>
                            </a>
                        </li>
                        <li className='collection-nav-li'>
                            <a className='collection-nav-a'>
                                <span>Analyses</span>
                            </a>
                        </li>
                        <li className='collection-nav-li'>
                            <a className='collection-nav-a'>
                                <span>Activity</span>
                            </a>
                        </li>
                    </div>
                </ul>
                </div>
            {/* </div><TableCollection nfts={nfts.filter((x: any) => x.nftOwner === _id)} links={`/your-collection`} linkDetail="Item" /> */}
            <TableCollection nfts={nfts} links={`/your-collection`} linkDetail="Item" />
        </main>
    )
}

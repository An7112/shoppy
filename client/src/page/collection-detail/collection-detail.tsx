import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AiOutlineUnorderedList, AiOutlineDelete, AiFillCaretDown } from 'react-icons/ai'
import { GrFormDown, GrFormUp } from 'react-icons/gr'
import { BsExclamationSquare, BsPatchCheckFill, BsShare } from 'react-icons/bs'
import { GiSelfLove } from 'react-icons/gi'
import { FaEthereum, FaOpencart, FaHome } from 'react-icons/fa'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { GoLinkExternal } from 'react-icons/go'
import { RiEditBoxLine } from 'react-icons/ri'
import { FiActivity } from 'react-icons/fi'
import { BiTransferAlt, BiDotsVerticalRounded } from 'react-icons/bi'
import { actionType } from '../../util/store/action'
import { useTypedSelector } from '../../util/hook'
import { LoadingFrame } from '../../component/loading'
import { Modal } from '../../component/message-modal'
import { ToastMessage } from '../../component/toast-message'
import { ApiResponeCollection } from '../../util/api-response'
import { RequestModal } from '../../component/request-modal'
import './collection-detail.scss'

export function CollectionDetail() {
    const { loadingDetail, googleStatus, requestLoading } = useTypedSelector((state) => state.stateReducer)
    const history = useNavigate()
    const dispatch = useDispatch()
    const [showDescribe, setShowDescribe] = useState(true)
    const [tokenDetail, setTokenDetail] = useState(false)
    const [offer, setShowOffer] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activity, setActivity] = useState(true)
    const [detail, setDetail] = useState<any>([])

    const { _id } = useParams()

    const getData = async () => {
        dispatch({
            type: actionType.SET_LOADING_DETAIL,
            loadingDetail: true
        })
        try {
            const response = await axios.get(
                `${ApiResponeCollection}/${_id}`
            );
            setDetail(response.data);
            dispatch({
                type: actionType.SET_LOADING_DETAIL,
                loadingDetail: false
            })
        } catch (error: any) {
            dispatch({
                type: actionType.SET_AXIOS_MESSAGE,
                axiosMessage: ({ key: "detail", value: `${error.message} when receiving data on collection details`, status: "error" })
            })
        }
    }

    async function deleteRequest() {
        dispatch({
            type: actionType.SET_REQUEST_LOADING,
            requestLoading: true
        })
        try {
            await axios.delete(`${ApiResponeCollection}/${_id}`)
            dispatch({
                type: actionType.SET_REQUEST_LOADING,
                requestLoading: false
            })
            history("/")
        } catch (error) {
            console.log(error)
        }
    }

    function showDown() {
        setShowDescribe(!showDescribe)
    }

    function showDownToken() {
        setTokenDetail(!tokenDetail)
    }

    function showOffer() {
        setShowOffer(!offer)
    }

    function showActivity() {
        setActivity(!activity)
    }

    useEffect(() => {
        return () => {
            getData()
            window.scrollTo(0, 0)
        }
    }, [])

    console.log(detail)
    return (
        <div className='class-collection-detail' id='collection-detail'>
            {googleStatus === false && <Modal />}
            {requestLoading === true && <RequestModal />}
            <ToastMessage keyMessage={"detail"} />
            <div className='content-page'>
                <div className='collection-detail-left'>
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"480px"} />
                            :
                            <img src={detail.nftImage} />
                    }
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <div className='class-showdown'>
                                    <div className='class-properties'>
                                        <div className='class-name-properties'>
                                            <AiOutlineUnorderedList className='properties icon' />
                                            <span className='properties'>Properties</span>
                                        </div>
                                        <div className='showdown'>
                                            {
                                                showDescribe
                                                    ?
                                                    <GrFormDown className='showdown-icon' onClick={showDown} />
                                                    : <GrFormUp className='showdown-icon' onClick={showDown} />
                                            }
                                        </div>
                                    </div>
                                    {showDescribe && <div className='class-down-detail'>
                                        <div className='class-down-grid'>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            )
                    }

                    {/*  */}
                    {
                        loadingDetail === true
                            ?
                            <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            :
                            (
                                <div className='class-showdown'>
                                    <div className='class-properties'>
                                        <div className='class-name-properties'>
                                            <BsExclamationSquare className='properties icon' />
                                            <span className='properties'>Item Detail</span>
                                        </div>
                                        <div className='showdown'>
                                            {
                                                tokenDetail
                                                    ?
                                                    <GrFormDown className='showdown-icon' onClick={showDownToken} />
                                                    :
                                                    <GrFormUp className='showdown-icon' onClick={showDownToken} />
                                            }
                                        </div>
                                    </div>
                                    {tokenDetail && <div className='class-down-detail'>
                                        <div className='class-down-grid'>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='down-detail-item'>
                                                <span className='title-item'>Category</span>
                                                <span>Shadow</span>
                                                <div className='detail-item-bottom'>
                                                    <div className='detail-item-bottom-percent'>
                                                        <p>9,007</p>
                                                    </div>
                                                    <div className='detail-item-bottom-price'>
                                                        <p>1.33323213</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            )
                    }
                </div>
                <div className='collection-detail-right'>
                    <div className='chakra-stack'>
                        <AiFillCaretDown className='svg-down-edit' style={{ display: edit ? 'block' : 'none' }} />
                        <div className='box-edit' style={{ display: edit ? 'flex' : 'none' }}>
                            <Link to={`/edit/${_id}`}>
                                <button>
                                    <RiEditBoxLine />
                                    <span>Edit</span>
                                </button>
                            </Link>
                            <button onClick={deleteRequest}>
                                <AiOutlineDelete />
                                <span>Delete</span>
                            </button>
                        </div>
                        <div className='chakra-stack-header'>
                            <div className='chakra-stack-header-left'>
                                <span className='header-left-span'>
                                    <p>Certified</p>
                                    <p className='check'><BsPatchCheckFill /></p>
                                </span>
                                <div className='floor-type'>
                                    {
                                        loadingDetail === true
                                            ?
                                            <LoadingFrame divWidth={"100px"} divHeight={"24px"} />
                                            :
                                            <>
                                                <p>Volumn</p>
                                                <p>{detail.nftVolumn}</p>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className='chakra-stack-header-right'>
                                <span><GiSelfLove /></span>
                                <span><BsShare /></span>
                                <span onClick={() => history("/ecommerce")}>
                                    <FaHome />
                                </span>
                                <span onClick={() => setEdit(!edit)}>
                                    <BiDotsVerticalRounded />
                                </span>
                            </div>
                        </div>
                        <div className='class-info-chakra-stack'>
                            {
                                loadingDetail === true
                                    ?
                                    <LoadingFrame divWidth={"100%"} divHeight={"24px"} />
                                    :
                                    <h3>{detail.nftName} #{detail._id}</h3>
                            }
                        </div>
                        <div className='class-info-chakra-stack'>
                            <div className='class-info-owner'>
                                {loadingDetail === true ? <LoadingFrame divWidth={"40px"} divHeight={"40px"} /> : <img src={detail.nftImage} alt='' />}
                                {loadingDetail === true ? <LoadingFrame divWidth={"240px"} divHeight={"40px"} /> : <div className='owner-name'>
                                    <span>Owner</span>
                                    <p>{detail.nftOwner}</p>
                                </div>}
                            </div>
                        </div>
                        {loadingDetail === true ? <LoadingFrame divWidth={"100%"} divHeight={"60px"} />
                            : (
                                <div className='class-info-chakra-stack'>
                                    <div className='class-offer'>
                                        <div className='class-offer-content'>
                                            <div className='offer-info'>
                                                <span>Price</span>
                                                <FaEthereum />
                                                <p>{detail.nftPrice}</p>
                                            </div>
                                        </div>
                                        <div className='class-offer-content'>
                                            <div className='offer-info'>
                                                {/* <button>Buy now</button> */}
                                                <button>Buy now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {loadingDetail === true ? <LoadingFrame divWidth={"100%"} divHeight={"60px"} spacing={"32px 0"} /> : (
                            <div className='class-info-chakra-stack'>
                                <div className='class-showdown'>
                                    <div className='class-properties offer'>
                                        <div className='class-name-properties'>
                                            <MdOutlineLocalOffer className='properties icon' />
                                            <span className='properties'>Offer</span>
                                        </div>
                                        <div className='showdown'>
                                            {
                                                offer
                                                    ?
                                                    <GrFormDown className='showdown-icon' onClick={showOffer} />
                                                    :
                                                    <GrFormUp className='showdown-icon' onClick={showOffer} />
                                            }
                                        </div>
                                    </div>
                                    {offer && <div className='class-down-offer'>
                                        <div className='chakra-accordion-panel'>
                                            <div className='chakra-stack'>
                                                <div className='chakra-stack-list'>
                                                    <div className='chakra-stack-grid'>
                                                        <div className='chakra-wrap'>
                                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                            <span>2%</span>
                                                            <span>Below floor</span>
                                                        </div>
                                                        <div className='chakra-wrap'>
                                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                            <p>An</p>
                                                            <span>Expiry: in 30 days</span>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className='chakra-stack-grid'>
                                                        <div className='chakra-wrap'>
                                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                            <span>2%</span>
                                                            <span>Below floor</span>
                                                        </div>
                                                        <div className='chakra-wrap'>
                                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                            <p>An</p>
                                                            <span>Expiry: in 30 days</span>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className='chakra-stack-grid'>
                                                        <div className='chakra-wrap'>
                                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                            <span>2%</span>
                                                            <span>Below floor</span>
                                                        </div>
                                                        <div className='chakra-wrap'>
                                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                            <p>An</p>
                                                            <span>Expiry: in 30 days</span>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className='chakra-stack-grid'>
                                                        <div className='chakra-wrap'>
                                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                            <span>2%</span>
                                                            <span>Below floor</span>
                                                        </div>
                                                        <div className='chakra-wrap'>
                                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                            <p>An</p>
                                                            <span>Expiry: in 30 days</span>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className='chakra-stack-grid'>
                                                        <div className='chakra-wrap'>
                                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                            <span>2%</span>
                                                            <span>Below floor</span>
                                                        </div>
                                                        <div className='chakra-wrap'>
                                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                            <p>An</p>
                                                            <span>Expiry: in 30 days</span>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className='chakra-stack-grid'>
                                                        <div className='chakra-wrap'>
                                                            <p><FaEthereum style={{ color: '#2081e2' }} /> 12 ETH</p>
                                                            <span>2%</span>
                                                            <span>Below floor</span>
                                                        </div>
                                                        <div className='chakra-wrap'>
                                                            <span style={{ paddingLeft: '0.2rem' }}>by</span>
                                                            <p>An</p>
                                                            <span>Expiry: in 30 days</span>
                                                        </div>
                                                        <hr></hr>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        )}

                        {loadingDetail === true ? <LoadingFrame divWidth={"100%"} divHeight={"60px"} /> : (
                            <div className='class-info-chakra-stack'>
                                <div className='class-showdown'>
                                    <div className='class-properties offer'>
                                        <div className='class-name-properties'>
                                            <FiActivity className='properties icon' />
                                            <span className='properties'>Activity</span>
                                        </div>
                                        <div className='showdown'>
                                            {
                                                activity
                                                    ?
                                                    <GrFormDown className='showdown-icon' onClick={showActivity} />
                                                    :
                                                    <GrFormUp className='showdown-icon' onClick={showActivity} />
                                            }
                                        </div>
                                    </div>
                                    {activity && <div className='class-down-offer'>
                                        <div className='chakra-accordion-panel'>
                                            <div className='chakra-stack'>
                                                <div className='chakra-stack-list'>
                                                    <div className='chakra-stack-grid-activity'>
                                                        <div className='chakra-wrap-left'>
                                                            <div className='chakra-wrap-left-content'>
                                                                <button className='wrap-left-content-button'>
                                                                    <BiTransferAlt />
                                                                    <p>Transfer</p>
                                                                </button>
                                                            </div>
                                                            <div className='chakra-wrap-left-content info'>
                                                                <span>From</span>
                                                                <p>71a12b</p>
                                                                <span>To</span>
                                                                <p>27a11b</p>
                                                                <span>22 hours ago</span>
                                                            </div>
                                                        </div>
                                                        <button className='chakra-wrap-right'>
                                                            <GoLinkExternal />
                                                        </button>
                                                    </div>
                                                    <hr style={{ width: '96%' }}></hr>
                                                    <div className='chakra-stack-grid-activity'>
                                                        <div className='chakra-wrap-left'>
                                                            <div className='chakra-wrap-left-content'>
                                                                <button className='wrap-left-content-button sale'>
                                                                    <FaOpencart />
                                                                    <p>Sale</p>
                                                                </button>
                                                            </div>
                                                            <div className='chakra-wrap-left-content info'>
                                                                <span>From</span>
                                                                <p>71a12b</p>
                                                                <span>To</span>
                                                                <p>27a11b</p>
                                                                <span>22 hours ago</span>
                                                            </div>
                                                        </div>
                                                        <button className='chakra-wrap-right'>
                                                            <GoLinkExternal />
                                                        </button>
                                                    </div>
                                                    <hr style={{ width: '96%' }}></hr>
                                                    <div className='chakra-stack-grid-activity'>
                                                        <div className='chakra-wrap-left'>
                                                            <div className='chakra-wrap-left-content'>
                                                                <button className='wrap-left-content-button'>
                                                                    <BiTransferAlt />
                                                                    <p>Transfer</p>
                                                                </button>
                                                            </div>
                                                            <div className='chakra-wrap-left-content info'>
                                                                <span>From</span>
                                                                <p>71a12b</p>
                                                                <span>To</span>
                                                                <p>27a11b</p>
                                                                <span>22 hours ago</span>
                                                            </div>
                                                        </div>
                                                        <button className='chakra-wrap-right'>
                                                            <GoLinkExternal />
                                                        </button>
                                                    </div>
                                                    <hr style={{ width: '96%' }}></hr>
                                                    <div className='chakra-stack-grid-activity'>
                                                        <div className='chakra-wrap-left'>
                                                            <div className='chakra-wrap-left-content'>
                                                                <button className='wrap-left-content-button sale'>
                                                                    <FaOpencart />
                                                                    <p>Sale</p>
                                                                </button>
                                                            </div>
                                                            <div className='chakra-wrap-left-content info'>
                                                                <span>From</span>
                                                                <p>71a12b</p>
                                                                <span>To</span>
                                                                <p>27a11b</p>
                                                                <span>22 hours ago</span>
                                                            </div>
                                                        </div>
                                                        <button className='chakra-wrap-right'>
                                                            <GoLinkExternal />
                                                        </button>
                                                    </div>
                                                    <hr style={{ width: '96%' }}></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

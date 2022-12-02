import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { LoadingFrame } from '../loading'
import { GiJumpAcross } from 'react-icons/gi'
import { useAppDispatch, useTypedSelector } from '../../util/hook'
import { actionType } from '../../util/store/action'
import './collection.scss'

export function Collection() {
    const dispatch = useAppDispatch()
    const { loadingCollection } = useTypedSelector((state) => state.stateReducer)
    const { dataCollection, addnew, dataLength } = useTypedSelector((state) => state.dataCollection)

    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(5)
    const [startSlice, setStartSlice] = useState(0)
    const [endSlice, setEndSlice] = useState<any>(null)
    const [pageNum, setPageNum] = useState<any>(3)

    const pageNumbers: Array<any> = []
    const pageLoads: Array<any> = []
    const pageCollectionLoads: Array<any> = []

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = dataCollection.slice(indexOfFirstData, indexOfLastData)
    const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber)
    const totalData = dataCollection.length

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i)
    }
    for (let i = 1; i <= Number(pageNum); i++) {
        pageLoads.push(i)
    }
    for (let i = 1; i <= 5; i++) {
        pageCollectionLoads.push(i)
    }


    function prev() {
        if (currentPage === 1) {
            setCurrentPage(1)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    function next() {
        if (currentPage === pageNumbers.length) {
            setCurrentPage(pageNumbers.length)
            if (addnew >= dataLength) {
                dispatch({
                    type: actionType.SET_ADD_NEW,
                    addnew: 0
                })
            } else {
                dispatch({
                    type: actionType.SET_ADD_NEW,
                    addnew: 5
                })
            }
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    function prevPage() {
        setCurrentPage(currentPage - Number(pageNum))
    }

    function nextPage() {
        setCurrentPage(currentPage + Number(pageNum))
    }

    useEffect(() => {
        if (currentPage >= pageNumbers.length - (Number(pageNum) - 1)) {
            setStartSlice(pageNumbers.length - Number(pageNum))
            setEndSlice(pageNumbers.length)
        } else {
            setStartSlice(currentPage - 1)
            setEndSlice(currentPage + (Number(pageNum) - 1))
        }
    }, [currentPage, dataCollection, addnew, pageNum])
    return (
        <div id='collection' className='class-collection'>
            <div className='fresnel-container'>
                <div className='collection-grid'>
                    <div className='collection-header'>
                        <div className='collection-nav'>
                            <nav className='collection-nav-box'>
                                <div className='collection-nav-content'>
                                    <ul className='collection-nav-ul'>
                                        <div className='collection-list-li'>
                                            <li className='collection-nav-li'>
                                                <a className='collection-nav-a active'>
                                                    <span>Tendency</span>
                                                </a>
                                            </li>
                                            <li className='collection-nav-li'>
                                                <a className='collection-nav-a'>
                                                    <span>On your mind</span>
                                                </a>
                                            </li>
                                        </div>
                                    </ul>
                                    <div className='colection-filter'>
                                        <select className='select-box' onChange={(e: any) => setPageNum(e.target.value)}>
                                            <option className='select-option' selected value={3}>
                                                3
                                            </option>
                                            <option className='select-option' value={5}>
                                                5
                                            </option>
                                        </select>
                                        <div className='box-set-page'>
                                            <GiJumpAcross className='icon-jum' />
                                            <input type='number' className='set-start-page' placeholder='...' onKeyPress={(e: any) => {
                                                if (e.key === "Enter") {
                                                    if (Number(e.target.value) > pageNumbers.length) {
                                                        setCurrentPage(pageNumbers.length)
                                                    } else {
                                                        setCurrentPage(Number(e.target.value))
                                                    }
                                                }
                                            }} />
                                        </div>
                                        <div className='fresnel-container'>
                                            <div className={(Number(pageNum) === 5
                                                ?
                                                'fresnel-container-pagination change'
                                                :
                                                'fresnel-container-pagination')}>
                                                <div className="pagination-button">
                                                    <button onClick={prev}>
                                                        <FcPrevious />
                                                    </button>
                                                </div>
                                                <div className="pagination-button">
                                                    {currentPage <= Number(pageNum)
                                                        ?
                                                        <button style={{ opacity: 0.2 }}>
                                                            <FcPrevious />
                                                            <FcPrevious />
                                                        </button>
                                                        :
                                                        <button onClick={prevPage} className="not-over-yet">
                                                            <FcPrevious />
                                                            <FcPrevious />
                                                        </button>
                                                    }
                                                </div>
                                                {dataCollection.length === 0 || loadingCollection === true
                                                    ?
                                                    <>
                                                        {pageLoads.map((ele: any) => (
                                                            <LoadingFrame divWidth={"40px"} divHeight={"40px"} />
                                                        ))}
                                                    </>
                                                    :
                                                    <>
                                                        {pageNumbers.slice(startSlice, endSlice).map((number) => (
                                                            <div style={{
                                                                backgroundColor: currentPage === number
                                                                    ?
                                                                    'white'
                                                                    :
                                                                    ''
                                                            }} className="pagination-div">
                                                                <button onClick={() => paginate(number)} style={{
                                                                    color: currentPage === number
                                                                        ?
                                                                        'black'
                                                                        :
                                                                        'white'
                                                                }}>
                                                                    {number}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </>
                                                }
                                                <div className="pagination-button next">
                                                    {pageNumbers.length - (Number(pageNum) - 1) <= currentPage
                                                        ? <button style={{ opacity: 0.2 }}>
                                                            <FcNext />
                                                            <FcNext />
                                                        </button>
                                                        : <button onClick={nextPage} className="not-over-yet">
                                                            <FcNext />
                                                            <FcNext />
                                                        </button>
                                                    }
                                                </div>
                                                <div className="pagination-button next">
                                                    <button onClick={next}>
                                                        <FcNext />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='fresnel-container'>
                                            <a href='#trending' style={{ textDecoration: 'none', color: 'white' }}>
                                                <button className='collection-trending-button' type='button'>
                                                    <span className='collection-trending-span'>
                                                        See everything
                                                    </span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/*  */}
                    <div className='colection-list tendency'>
                        <div className='colection-grid-col6'>
                            <div className='colection-grid-col6-content'>
                                <>
                                    <div className='colection-grid-header'>
                                        <div className='colection-header-name'>
                                            <span>COLLECTION</span>
                                        </div>
                                        <div className='colection-header-name plancher'>
                                            <span>Blockchain</span>
                                        </div>
                                        <div className='colection-header-name volume'>
                                            <span>Created</span>
                                        </div>
                                    </div>
                                </>
                                {dataCollection.length === 0 || loadingCollection === true
                                    ?
                                    <div className='collection-table-grid'>
                                        {pageCollectionLoads.map((ele: any) => (
                                            <LoadingFrame divWidth={"100%"} divHeight={"96px"} />
                                        ))}
                                    </div>
                                    :
                                    (
                                        <div className='collection-table-grid'>
                                            {
                                                currentData.map((ele, index) => (
                                                    <>
                                                        <Link to={`/your-collection/${ele.address}`} className='collection-list-item' key={ele._id}>
                                                            <div className='colection-header-name items'>
                                                                <span className='span-id'>{index + 1}</span>
                                                                <img src={ele.logo} alt="" />
                                                                <span>{ele.username}</span>
                                                            </div>
                                                            <div className='colection-header-name plancher items'>
                                                                <span>{ele.blockchain}</span>
                                                            </div>
                                                            <div className='colection-header-name volume items'>
                                                                <span>{new Date(ele.date).toDateString()}</span>
                                                            </div>
                                                        </Link>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='colection-list tendency right'>
                        <div className='colection-grid-col6'>
                            <div className='colection-grid-col6-content'>
                                <div>
                                    <div className='colection-grid-header'>
                                        <div className='colection-header-name'>
                                            <span>COLLECTION</span>
                                        </div>
                                        <div className='colection-header-name plancher'>
                                            <span>FLOOR PRICE</span>
                                        </div>
                                        <div className='colection-header-name volume'>
                                            <span>VOLUME</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='collection-table-grid'>
                                    {dataCollection.length === 0 || loadingCollection === true
                                        ?
                                        <div className='collection-table-grid'>
                                            {pageCollectionLoads.map((ele: any) => (
                                                <LoadingFrame divWidth={"100%"} divHeight={"96px"} />
                                            ))}
                                        </div>
                                        :
                                        (
                                            <div className='collection-table-grid'>
                                                {
                                                    dataCollection.slice(5, 10).map((ele, index) => (
                                                        <Link to={"/your-collection"} className='collection-list-item' key={ele._id}>
                                                            <div className='colection-header-name items'>
                                                                <span className='span-id'>{index + 1}</span>
                                                                <img src={ele.nftImage} />
                                                                <span>{ele.nftName}</span>
                                                            </div>
                                                            <div className='colection-header-name plancher items'>
                                                                <span>{ele.nftPrice} ETH</span>
                                                            </div>
                                                            <div className='colection-header-name volume items'>
                                                                <span>{ele.nftVolumn}</span>
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
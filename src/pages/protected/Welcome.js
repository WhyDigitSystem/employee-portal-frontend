import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setPageTitle } from '../../features/common/headerSlice'
import TemplatePointers from '../../features/user/components/TemplatePointers'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
      }, [])

    return(
      <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
        <img src="/intro.png" className="w-150" alt="dashwind-logo" />
            <TemplatePointers />
            <br></br>
            <Link to="/app/dashboard"><button className="btn bg-base-100 btn-outline" style={{marginLeft:'38%'}}>Get Started</button></Link>
        </div>
      </div>
    </div>
    )
}

export default InternalPage
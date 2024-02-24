import TemplatePointers from "./components/TemplatePointers";
import wdsLogo from '../../assets/wds_logo_new.png';



function LandingIntro() {

  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          {/* Company logo in the top left corner */}
          <img src={wdsLogo} className="absolute top-0 left-0 w-25" alt="Company Logo" />
          {/* <img src={wdsLogo} className="absolute top-0 left-0 h-10 md:h-20 lg:h-24" alt="Company Logo" /> */}




          <h1 className='text-3xl text-center font-bold '>
            {/* <img src="/logo196.png" className="w-20 inline-block mr-2 mask mask-circle" alt="dashwind-logo" /> */}
            HRMS</h1>

          <div className="text-center mt-12"><img src="./intro1.png" alt="Dashwind Admin Template" className="w-90 inline-block"></img></div>

          {/* Importing pointers component */}
          <TemplatePointers />

        </div>

      </div>
    </div>
  )

}

export default LandingIntro
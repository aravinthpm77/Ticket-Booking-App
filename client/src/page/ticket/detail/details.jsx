import TopLayout from '../../../layout/toppage/toppage'
import busimg from '../../../assets/bg-bus.jpg'
import RootLayout from '../../../layout/RootLayout'
import WarningMessage from '../../../components/alertmessage/warningmessage'
import { Link } from 'react-router-dom'
import BusSeat from './seat/busseat/busSeat'

const Details = () => {
    const message   = (
        <>
        One Individual can only book 6 tickets at a time. If you want to book more tickets, please <Link to="/support-team" className='font-medium text-yellow-700'>reach out to our support team.</Link>
        </>
    );
    
  return (
    <div className='w-full pb-12 space-y-12 '>
        <TopLayout 
            bgImg={busimg}
            title={"Bus Details"}
            />
            <RootLayout className="w-full pb-16 space-y-12">
                {/*Seat layout and selection action details */}
                <div className="w-full space-y-8">

                    {/*Warning Message */}
                    <WarningMessage message={message} />
                </div>
                {/*Bus Details */}
                <div className="flex flex-col items-center justify-center w-full gap-8 text-center">
                    <BusSeat />
                </div>
            </RootLayout>

        
        
    </div>
  )
}

export default Details
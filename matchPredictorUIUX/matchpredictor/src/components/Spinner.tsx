import './Spinner.css'

type Props={
  loader:Boolean
}
export default function Spinner(props:Props) {

    return (
      <div className='spin-container' style={{display:props.loader?"flex":"none"}} >
         <div className="spinner"></div>
      </div>
    )
}

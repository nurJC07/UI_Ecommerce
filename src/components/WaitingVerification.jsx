import React, {Component} from 'react'


class WaitingVerification extends Component {
    render (){
        return (
            <div>
                <h2>Please attention </h2>
                <p> Please check your email for verification account</p>
                <p> If you dont get any email confirmation, please click button below for resend email</p>
                <input type='button' value = "Resend Email" />
            </div>
        )
    }
}

export default WaitingVerification
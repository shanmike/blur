import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


export default class Stripe extends Component {
    constructor() {
        super()
        this.state = {
          amount: 999,
          product: ''
        }
      }
    
      onToken = token => {
        //   console.log('token', token);
          token.card = void 0;
          const { amount } = this.state
          axios.post('/api/payment', { token, amount })
            .then(charge => { console.log('charge response', charge.data) });
        } 
    render() {  
        return (
            <div className="Stripe">
            <StripeCheckout
                token={this.onToken}
                label={`Go Premium`} 
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                amount={this.state.amount}
                zipCode={false}
                billingAddress={false}
                panelLabel="Charge me"
            />
            </div> 
        )
    }
}


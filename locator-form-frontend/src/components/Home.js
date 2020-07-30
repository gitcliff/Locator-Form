import React from "react";
import { render } from "react-dom";
//import './styles.css'
 import { Formik, Form, Field, FieldArray, useField } from 'formik';
import styled from "@emotion/styled";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';

interface Values {
	  id: string;
	  firstName: string;
	  lastName: string;
	  middleInitial: string;
	  acceptedTerms: string;
	  visitPurpose: string;
	  title: string;
		mobilePhone: string;
		businessPhone: string;
gender: string;        
passportNumber: string; 
nationality: string; 
portOfEmbarkation: string;
coutriesVisited: string;
lengthOfStay: string;
permAddress:
	{
		numberAndStreet: string; 
		apartmentNumber: string; 
		city: string; 
		stateProvince: string; 
		country: string; 
		zipPostalCode: string;
	},

tempAddress:
	{
		hotelName: string; 
		numberAndStreet: string; 
		apartmentNumber: string; 
		city: string; 
		stateProvince: string; 
		country: string; 
		zipPostalCode: string;
	},

emergencyContact:
	{
		lastName: string;
		firstName: string;
		city: string;
		country: string;
		email: string;
		mobilePhone: string;
	},

familyTravelCompanions: [
{
	 id: string;
	 lastName: string;
	 firstName: string;
	 middleInitial: string;
	 seatNumber: string;
	 dateOfBirth: string;
   nationality: string;
	 passportNumber: string;
},
],

nonFamilyTravelCompanions: [
{
	id: string;
	lastName: string;
  firstName: string;
	middleInitial: string;
	seatNumber: string;
  dateOfBirth: string;
	nationality: string;
	passportNumber: string;
},
],
	
}





const MyTextInput = ({ label, ...props }) => {
	  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	  // which we can spread on <input> and alse replace ErrorMessage
		// entirely.
	// <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
	  const [field, meta] = useField(props);
	  return (
	    <>
	    <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
	      <input className="text-input form-control" {...field} {...props} />
	      {meta.touched && meta.error ? (
	        <div className="error">{meta.error}</div>
	      ) : null}
	    </>
	  );
	};
	
	const MyCheckbox = ({ children, ...props }) => {
	  const [field, meta] = useField({ ...props, type: "checkbox" });
	  return (
	    <>
	      <label className="checkbox">
	        <input {...field} {...props} type="checkbox" classname="form-control" />
	        {children}
	      </label>
	      {meta.touched && meta.error ? (
	        <div className="error">{meta.error}</div>
	      ) : null}
	    </>
	  );
	};

	// Styled components ....
	const StyledSelect = styled.select`
	  color: var(--blue);	
	  width : 150px;
	  `;

	const StyledErrorMessage = styled.div`
	  font-size: 12px;
	  color: var(--red-600);
	  width: 150px;
	  margin-top: 0.25rem;
	  &:before {
	    content: "❌ ";
	    font-size: 10px;
	  }
	  @media (prefers-color-scheme: dark) {
	    color: var(--red-300);
	  }
	`;

	const StyledLabel = styled.label`
	  margin-top: 1rem;	
	  `;

	const MySelect = ({ label, ...props }) => {
	  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	  // which we can spread on <input> and alse replace ErrorMessage
		// entirely.
	  const [field, meta] = useField(props);
	  return (
	    <>
	      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
	      <StyledSelect classname="form-control" {...field} {...props} />
	      {meta.touched && meta.error ? (
	        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
	      ) : null}
	    </>
	  );
	};
	
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
	
	const initialValues={ 
			id: '', firstName: '', lastName: '', middleInitial: '', email: '',
          acceptedTerms: false,
          visitPurpose: '', title: '', airlineName: '', flightNumber: '', 
          seatNumber: '', arrivalDate: '',
          mobilePhone: '', businessPhone: '',
          gender: '', dateOfBirth: '', passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: '',
          fever: '', soreThroat: '', jointPain: '', cough: '', breathingDifficulties: '', rash: '',
          
          permAddress: 
          	{
          	numberAndStreet: '', 
              apartmentNumber: '', 
              city: '', 
              stateProvince: '', 
              country: '', 
              zipPostalCode: '',
          	},
          
          tempAddress:
          	{
          	hotelName: '', 
              numberAndStreet: '', 
              apartmentNumber: '', 
              city: '', 
              stateProvince: '', 
              country: '', 
              zipPostalCode: '',
          	},
          
          
          emergencyContact: 
  		    {
  		    	lastName: '',
  		    	firstName: '',    			
  		    	city: '',
  		    	country: '',
  		    	email: '',
  		    	mobilePhone: '',
  		    },
    		
    		familyTravelCompanions: [
  		    {
  		      lastName: "",
  		      firstName: "",
  		    middleInitial: "",
  		      seatNumber: "",
  		      dateOfBirth: "",
  		      gender: "",
  		    nationality: "",
 			 passportNumber: "",
  		    }
  		  ],
    		nonFamilyTravelCompanions: [
  		    {
  		      lastName: "",
  	    	  firstName: "",
  	    	middleInitial: "",
  	    	  seatNumber: "",
  	    	dateOfBirth: "",
  		    gender: "",
  		    nationality: "",
  			 passportNumber: "",
  		    }
  		  ]
        };
	
	function equalTo(ref: any, msg: any) {
		  return Yup.mixed().test({
		    name: 'equalTo',
		    exclusive: false,
		    message: msg || '${path} must be the same as ${reference}',
		    params: {
		      reference: ref.path,
		    },
		    test: function(value: any) {
		      return value === this.resolve(ref);
		    },
		  });
		}
		Yup.addMethod(Yup.string, 'equalTo', equalTo);
	

class Home extends React.Component {      

	constructor(props) {
		super(props);
		this.state = {
				submitErrorMessage : ""
		};
	}

	handleSubmit = (values) => {
       var object = {};
       
       var json = JSON.stringify(values);
       console.log(json);

       fetch(`${process.env.REACT_APP_DATA_IMPORT_API}/locator-form` , {
               method: 'POST',
               headers: {
                       'Content-Type': 'application/json', 
               },
               body: json
       }).then(function(response) {
    	   if(response.ok) {
    		     return response.blob();
    	   } else {
    	         this.props.history.push('/success/');
    	   }
    	}).catch( err => {
                console.log(err);
                this.setState({submitErrorMessage: "An error occurred"})
        })
       }

  render() {
		var id = null;
		
		id = uuidv4();  
  return (
    <div className="home">
    	<div className="container">
        <div className="row">
          <div className="col-lg-12 ">
              <Formik
               initialValues={initialValues}
              validationSchema={Yup.object({
            	  
             	
                    acceptedTerms: Yup.boolean()
                      .required('Required')
                      .oneOf([true], 'You must accept the terms and conditions.'),
                      
         	         airlineName: Yup.string()
         	           .max(15, 'Must be 15 characters or less')
         	           .required('Required'),
                  flightNumber: Yup.string()
         	           .max(15, 'Must be 15 characters or less')
         	           .required('Required'),
                  seatNumber: Yup.string()
         	           .max(15, 'Must be 15 characters or less')
         	           .required('Required'),
                  arrivalDate: Yup.string()
                    	   .required('Required'),
                    	   
                    		 title: Yup.string()
                             .oneOf(
                               ['mr', 'mrs', 'miss', 'other'],
                               'Invalid Status'
                             )
                             .required('Required'),
                    	      firstName: Yup.string()
                              .max(15, 'Must be 15 characters or less')
                              .required('Required'),
                   	     lastName: Yup.string()
                   	       .max(20, 'Must be 20 characters or less')
                   	       .required('Required'),
                   	    middleInitial: Yup.string()
                	       .max(20, 'Must be 20 characters or less')
                	       .required('Required'),
                   	    gender: Yup.string()
       	             .oneOf(
       	               ['male', 'female'],
       	               'Invalid Gender'
       	             )
       	             .required('Required'),
       	 		 portOfEmbarkation: Yup.string()
				    .max(20, 'Must be 20 characters or less')
					.required('Required'), 
		 countriesVisited: Yup.string()
						.required('Required'), 
		 lengthOfStay: Yup.string()
							.required('Required'), 
							
					           fever: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             soreThroat: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             jointPain: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             cough: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             breathingDifficulties: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),
					             rash: Yup.string()
					             .oneOf(
					               ['yes', 'no'],
					               'Invalid Status'
					             )
					             .required('Required'),	
					             
					             visitPurpose: Yup.string()
					             .oneOf(
					               ['business', 'pleasure', 'other'],
					               'Invalid Job Type'
					             )
					             .required('Required'),
					             mobilePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
					         	   .min(10, 'Must be 10 numbers'),
					  	     businessPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
					         	   .min(10, 'Must be 10 numbers'),
					  	    
				           	  email: Yup.string()
					              .email('Invalid email address')
					              .required('Required'),
					          confirmEmail: Yup.string().equalTo(Yup.ref('email'), 'Emails must match')
					          	   .oneOf([Yup.ref('confirmEmail'), "Emails must match"])
					              .required('Email confirm is required'),
					              
					     		 passportNumber: Yup.string()
								   .max(20, 'Must be 20 characters or less')
								   .required('Required'),
						 nationality: Yup.string()
									.max(20, 'Must be 20 characters or less')
									.required('Required'),
									
									 permAddress: Yup.object().shape ({
										 
										 numberAndStreet: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
							             apartmentNumber: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             city: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             stateProvince: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             country: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             zipPostalCode: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
									 }),
									 
									  tempAddress: Yup.object().shape ({
										  
										  hotelName: Yup.string()
							              			.max(20, 'Must be 20 characters or less')
							              			.required('Required'),
							              
										 numberAndStreet: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
							             apartmentNumber: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             city: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             stateProvince: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             country: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),

							             zipPostalCode: Yup.string()
							                       .max(20, 'Must be 20 characters or less')
							                       .required('Required'),
									 }),
									 
									  emergencyContact: Yup.object().shape ({
										  
										  lastName: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  firstName: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  city: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  country: Yup.string()
										  	.max(20, 'Must be 20 characters or less')
										  	.required('Required'),

										  email: Yup.string()
										  	.email('Invalid email address'),

										  mobilePhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
										  	.min(10, 'Must be 10 numbers'),

									 
									  }),									

              })}
              
              onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                	 values.id = id;
                    
                    this.handleSubmit(values);
                    setSubmitting(false);
                  }, 400);
                }}
              
               render={({ values, errors, touched, handleReset }) => {
            	   
                 return (
                       <div className="row">
                       <div className="col-lg-12 ">
                   <Form>
                   <div className="row">
                   <div className="col-lg-12 ">
         	       <p> <FormattedMessage id="nav.item.topOfForm" defaultMessage="Public Health Passenger Locator Form: To protect your health, public health officers need you to complete this form whenever they suspect a communicable disease onboard a flight. Your information will help public health officers to contact you if you were exposed to a communicable disease. It is important to fill out this form completely and accurately. Your information is intended to be held in accordance with applicable laws and used only for public health purposes. ~Thank you for helping us to protect your health."/></p>

         	       </div>
                   </div>
                   <div className="row">
                   <div className="col-lg-12 ">
         	       <h5> <FormattedMessage id="nav.item.flightInformation" defaultMessage="Flight Information"/></h5>
         	       </div>
                   </div>
                   <div className="row">
                   <div className="col-lg-3 form-group form-group">
         	       <MyTextInput
                      label=<FormattedMessage id="nav.item.airline" defaultMessage="Airline"/>
                      name="airlineName"
                      type="medtext"
                  />
        	       </div>
         	      

                  <div className="col-lg-3 form-group form-group">
         	       <MyTextInput
         	       	  label=<FormattedMessage id="nav.item.flightNumber" defaultMessage="Flight"/>
                      name="flightNumber"
                      type="smalltext"
                  />
         	       </div>
                   <div className="col-lg-3 form-group form-group">
         	       <MyTextInput
                      label=<FormattedMessage id="nav.item.seat" defaultMessage="Seat"/>
                      name="seatNumber"
                      type="smalltext"
                  />
         	       </div>
                   <div className="col-lg-3 form-group form-group">
         	       <MyTextInput
                      label=<FormattedMessage id="nav.item.dateOfArrival" defaultMessage="Date Of Arrival"/>
                      name="arrivalDate"
                      type="date"
                  />
         	       </div>
                   </div>
                   <div className="row">
                   <div className="col-lg-12 ">
         	       
        	       <h5> <FormattedMessage id="nav.item.personalInformation" defaultMessage="Personal Information"/> </h5>
         	       </div>
                   </div>
                   <div className="row">
                   <div className="col-lg-2 form-group">
              	 <MySelect label=<FormattedMessage id="nav.item.title" defaultMessage="Title"/> 
              	 name="title">
                 <option value=""></option>
                 <option value="mr">Mr</option>
                 <option value="mrs">Mrs</option>
                 <option value="miss">Miss</option>
                 <option value="other">Other</option>
               </MySelect>
               </div>
               <div className="col-lg-2 form-group">
               
               <MyTextInput
               label=<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name"/>
               name="lastName"
               type="text"
             /> 
               </div>
               <div className="col-lg-2 form-group">
            	   <MyTextInput
                     label=<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name"/>
                     name="firstName"
                     type="text"
                   />
               </div>
               <div className="col-lg-2 form-group">
                   
                   <MyTextInput
                   label=<FormattedMessage id="nav.item.middleInitial" defaultMessage="Middle Initial"/>
                   name="middleInitial"
                   type="smalltext"
                 /> 
                   </div>
                   <div className="col-lg-2 form-group">
         
            <MySelect label=<FormattedMessage id="nav.item.sex" defaultMessage="Sex"/>
            name="gender">
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </MySelect>
            
        </div>
        <div className="col-lg-2 form-group">
	       <MyTextInput
           label=<FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth"/>
           name="dateOfBirth"
           type="date"
       />
	       </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">
         
         <h5> <FormattedMessage id="nav.item.healthInformation" defaultMessage="Health Information"/></h5>
	       </div>
           </div>
           <div className="row">
           <div className="col-lg-4 form-group ">
         <MyTextInput
           label=<FormattedMessage id="nav.item.proposedLengthOfStay" defaultMessage="Proposed Length of Stay in Mauritius (days)"/>
           name="lengthOfStay"
           type="smalltext"
         />
        </div> 

        <div className="col-lg-4 form-group ">
         <MyTextInput
           label=<FormattedMessage id="nav.item.countriesVisited" defaultMessage="Countries visited during last 6 months"/>
           name="countries"
           type="text"
         />
        </div> 
        <div className="col-lg-4 form-group ">
         <MyTextInput
           label=<FormattedMessage id="nav.item.portOfEmbarkation" defaultMessage="Port Of Embarkation"/>
           name="portOfEmbarkation"
           type="text"
         />

	       </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">
         
         <h5> <FormattedMessage id="nav.item.areYouSufferingFrom" defaultMessage="Are you suffering from?"/></h5>
	       </div>
           </div>
           <div className="row">
           <div className="col-lg-2 form-group ">
        	 <MySelect label=<FormattedMessage id="nav.item.fever" defaultMessage="Fever"/> 
        		 name="fever">
             <option value=""></option>
             <option value="yes" >Yes</option>
             <option value="no">No</option>
           </MySelect>
           </div>

           <div className="col-lg-2 form-group ">
        	 <MySelect label=<FormattedMessage id="nav.item.soreThroat" defaultMessage="Sore Throat"/> name="soreThroat">
           <option value=""></option>
           <option value="yes">Yes</option>
           <option value="no">No</option>
         </MySelect>
         </div>
         <div className="col-lg-2 form-group ">
         <MySelect label=<FormattedMessage id="nav.item.jointPain" defaultMessage="Joint Pain"/> name="jointPain">
         <option value=""></option>
         <option value="yes">Yes</option>
         <option value="no">No</option>
        </MySelect>
        </div>
        <div className="col-lg-2 form-group ">
        <MySelect label=<FormattedMessage id="nav.item.cough" defaultMessage="Cough"/> name="cough">
        <option value=""></option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </MySelect>
        </div>
        <div className="col-lg-2 form-group ">
        <MySelect label=<FormattedMessage id="nav.item.breathingdifficulties" defaultMessage="Breathing Difficulties"/> name="breathingDifficulties">
        <option value=""></option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </MySelect>
        </div>
        <div className="col-lg-2 form-group ">
        <MySelect label=<FormattedMessage id="nav.item.rash" defaultMessage="Rash"/> name="rash">
        <option value=""></option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        </MySelect>
        </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">
        
        <h5> <FormattedMessage id="nav.item.phoneNumbers" defaultMessage="Phone Number(s) Where you can be reached if needed? Include country code and city code."/> </h5>
	       </div>
           </div>
           <div className="row">
           <div className="col-lg-4 form-group ">
            <MySelect label=<FormattedMessage id="nav.item.purposeOfVisit" defaultMessage="Purpose of Visit"/> name="visitPurpose">
          <option value=""></option>
          <option value="business">Business</option>
          <option value="pleasure">Pleasure</option>
          <option value="other">Other</option>
        </MySelect>
        </div>
        <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone"/>
              name="mobilePhone"
              type="text"
          />
            </div>
            <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.businessPhone" defaultMessage="Business Phone"/>
              name="businessPhone"
              type="text"
          />
            </div>
           </div>
           <div className="row">
           <div className="col-lg-3 form-group ">
            
            <MyTextInput
            label=<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address"/>
            name="email"
            type="email"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
            label=<FormattedMessage id="nav.item.confirmEmailAddress" defaultMessage="Confirm Email Address"/>
            name="confirmEmail"
            type="email"
          />
            </div>
            <div className="col-lg-3 form-group ">
        	   <MyTextInput
                 label=<FormattedMessage id="nav.item.nationality" defaultMessage="Nationality"/>
                 name="nationality"
                 type="medtext"
               />
           </div>
           <div className="col-lg-3 form-group ">
       	   <MyTextInput
              label=<FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number"/>
              name="passportNumber"
              type="medtext"
            />
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">
            <h5> <FormattedMessage id="nav.item.permanent Address" defaultMessage="Permanent Address"/></h5>
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-4 form-group">
            <MyTextInput
              label=<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street"/>
              name="permAddress.numberAndStreet"
              type="text"
          />
            </div>
            <div className="col-lg-4 form-group">
            <MyTextInput
              label=<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number"/>
              name="permAddress.apartmentNumber"
              type="smalltext"
          />
            </div>
            <div className="col-lg-4 form-group">
            <MyTextInput
              label=<FormattedMessage id="nav.item.city" defaultMessage="City"/>
              name="permAddress.city"
              type="medtext"
          />
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.state/Province" defaultMessage="State/Province"/>
              name="permAddress.stateProvince"
              type="text"
          />
            </div>
            <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.country" defaultMessage="Country"/>
              name="permAddress.country"
              type="medtext"
          />
            </div>
            <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code"/>
              name="permAddress.zipPostalCode"
              type="text"
          />
            </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">
            <h5> <FormattedMessage id="nav.item.temporaryAddress" defaultMessage="Temporary Address in Mauritius"/></h5>
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.hotelName" defaultMessage="Hotel Name"/>
              name="tempAddress.hotelName"
              type="text"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.numberAndStreet" defaultMessage="Number and Street"/>
              name="tempAddress.numberAndStreet"
              type="text"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.apartmentNumber" defaultMessage="Apartment Number"/>
              name="tempAddress.apartmentNumber"
              type="smalltext"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.city" defaultMessage="City"/>
              name="tempAddress.city"
              type="medtext"
          />
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.state/Province" defaultMessage="State/Province"/>
              name="tempAddress.stateProvince"
              type="text"
          />
            </div>
            <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.country" defaultMessage="Country"/>
              name="tempAddress.country"
              type="medtext"
          />
            </div>
            <div className="col-lg-4 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.zipPostalCode" defaultMessage="Zip/Postal Code"/>
              name="tempAddress.zipPostalCode"
              type="text"
          />
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">
            <h5> <FormattedMessage id="nav.item.emergencyContact" defaultMessage="Emergency Contact Information of someone who can reach you during the next 30 days"/></h5>
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name"/>
              name="emergencyContact.lastName"
              type="text"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name"/>
              name="emergencyContact.firstName"
              type="text"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.city" defaultMessage="City"/>
              name="emergencyContact.city"
              type="medtext"
          />
            </div>
            <div className="col-lg-3 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.country" defaultMessage="Country"/>
              name="emergencyContact.country"
              type="medtext"
          />
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-6 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.emailAddress" defaultMessage="Email Address"/>
              name="emergencyContact.email"
              type="text"
          />
            </div>
            <div className="col-lg-6 form-group ">
            <MyTextInput
              label=<FormattedMessage id="nav.item.mobilePhone" defaultMessage="Mobile Phone"/>
              name="emergencyContact.mobilePhone"
              type="text"
          />
  	       </div>
           </div>
           <div className="row">
           <div className="col-lg-12 ">    
 	       <h5> <FormattedMessage id="nav.item.addTravelCompanionFamily" defaultMessage="Travel Companions Family"/></h5>
 	       </div>
           </div>
           <FieldArray
             name="familyTravelCompanions"
             render={({ insert, remove, push }) => (

               <div>
                 {values.familyTravelCompanions.length > 0 &&
                   values.familyTravelCompanions.map((comp, index) => (
                     <div  key={index}>

                     <div className="row">
                     <div className="col-lg-6 form-group ">
                        
                         <label htmlFor={`familyTravelCompanions.${index}.lastName`}><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name"/></label>
                         <Field className="form-control"
                           name={`familyTravelCompanions.${index}.lastName`}
                           type="text"
                         />
                         {errors.familyTravelCompanions &&
                           errors.familyTravelCompanions[index] &&
                           errors.familyTravelCompanions[index].lastName &&
                           touched.familyTravelCompanions &&
                           touched.familyTravelCompanions[index].lastName && (
                             <div className="field-error">
                               {errors.familyTravelCompanions[index].lastName}
                             </div>
                           )}
                       </div>
                         <div className="col-lg-6 form-group ">
                         <label htmlFor={`familyTravelCompanions.${index}.firstName`}><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name"/></label>
                         <Field className="form-control"
                           name={`familyTravelCompanions.${index}.firstName`}
                           type="text"
                         />
                         {errors.familyTravelCompanions &&
                           errors.familyTravelCompanions[index] &&
                           errors.familyTravelCompanions[index].firstName &&
                           touched.familyTravelCompanions &&
                           touched.familyTravelCompanions[index].firstName && (
                             <div className="field-error">
                               {errors.familyTravelCompanions[index].firstName}
                             </div>
                           )}
                       </div>
                       </div>
                       <div className="row">
                       <div className="col-lg-1 ">
                           <label htmlFor={`familyTravelCompanions.${index}.seatNumber`}><FormattedMessage id="nav.item.seat" defaultMessage="Seat"/></label>
                           <Field className="form-control"
                             name={`familyTravelCompanions.${index}.seatNumber`}
                             type="smalltext"
                           />
                           {errors.familyTravelCompanions &&
                             errors.familyTravelCompanions[index] &&
                             errors.familyTravelCompanions[index].seatNumber &&
                             touched.familyTravelCompanions &&
                             touched.familyTravelCompanions[index].seatNumber && (
                               <div className="field-error">
                                 {errors.familyTravelCompanions[index].seatNumber}
                               </div>
                             )}
                           </div>
                           <div className="col-lg-2 form-group ">
                             <label htmlFor={`familyTravelCompanions.${index}.dateOfBirth`}><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth"/></label>
                             <Field className="form-control"
                               name={`familyTravelCompanions.${index}.dateOfBirth`}
                               type="date"
                             />
                             {errors.familyTravelCompanions &&
                               errors.familyTravelCompanions[index] &&
                               errors.familyTravelCompanions[index].dateOfBirth &&
                               touched.familyTravelCompanions &&
                               touched.familyTravelCompanions[index].dateOfBirth && (
                                 <div className="field-error">
                                   {errors.familyTravelCompanions[index].dateOfBirth}
                                 </div>
                               )}
                           </div>
                           <div className="col-lg-2 form-group ">
                               <MySelect
                               label=<FormattedMessage id="nav.item.sex" defaultMessage="Sex"/> 
                            	   name={`familyTravelCompanions.${index}.gender`}>
                               <option value=""></option>
                               <option value="male">Male</option>
                               <option value="female">Female</option>
                               </MySelect>
                               {errors.familyTravelCompanions &&
                                 errors.familyTravelCompanions[index] &&
                                 errors.familyTravelCompanions[index].gender &&
                                 touched.familyTravelCompanions &&
                                 touched.familyTravelCompanions[index].gender && (
                                   <div className="field-error">
                                     {errors.familyTravelCompanions[index].gender}
                                   </div>
                                 )}
                             </div>

                             <div className="col-lg-3 form-group ">
                               <label htmlFor={`familyTravelCompanions.${index}.nationality`}><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality"/></label>
                               <Field className="form-control"
                                 name={`familyTravelCompanions.${index}.nationality`}
                                 type="medtext"
                               />
                               {errors.familyTravelCompanions &&
                                 errors.familyTravelCompanions[index] &&
                                 errors.familyTravelCompanions[index].nationality &&
                                 touched.familyTravelCompanions &&
                                 touched.familyTravelCompanions[index].nationality && (
                                   <div className="field-error">
                                     {errors.familyTravelCompanions[index].nationality}
                                   </div>
                                 )}
                             </div>
                             <div className="col-lg-3 form-group ">
                                 <label htmlFor={`familyTravelCompanions.${index}.passportNumber`}><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number"/></label>
                                 <Field className="form-control"
                                   name={`familyTravelCompanions.${index}.passportNumber`}
                                   type="medtext"
                                 />
                                 {errors.familyTravelCompanions &&
                                   errors.familyTravelCompanions[index] &&
                                   errors.familyTravelCompanions[index].passportNumber &&
                                   touched.familyTravelCompanions &&
                                   touched.familyTravelCompanions[index].passportNumber && (
                                     <div className="field-error">
                                       {errors.familyTravelCompanions[index].passportNumber}
                                     </div>
                                   )}
                               </div>
                               <div className="col-lg-1 ">
                         <button
                           type="button"
                           className="secondary"
                           onClick={() => remove(index)}
                         >
                           X
                         </button>
                       </div>
                       </div>
                     </div>
                     
                   ))}
                 <button
                   type="button"
                   className="secondary"
                   onClick={() => push({ lastName: "", firstName: "" }) }
                 >
                 <FormattedMessage id="nav.item.addTravelCompanionFamily" defaultMessage="Add Travel Companion Family"/>
                 </button>
               </div>
             )}
           />

           <div className="row">
           <div className="col-lg-12 ">    
           <h5> Travel Companions Non-Family</h5>
  	       </div>
           </div>
            <FieldArray
              name="nonFamilyTravelCompanions"
              render={({ insert, remove, push }) => (
                <div>
                  {values.nonFamilyTravelCompanions.length > 0 &&
                    values.nonFamilyTravelCompanions.map((comp, index) => (
                      <div  key={index}>

                      <div className="row">
                      <div className="col-lg-6 form-group ">
                          <label htmlFor={`nonFamilyTravelCompanions.${index}.lastName`}><FormattedMessage id="nav.item.lastFamilyName" defaultMessage="Last (Family) Name"/></label>
                          <Field className="form-control"
                            name={`nonFamilyTravelCompanions.${index}.lastName`}
                            type="text"
                          />
                          {errors.nonFamilyTravelCompanions &&
                            errors.nonFamilyTravelCompanions[index] &&
                            errors.nonFamilyTravelCompanions[index].lastName &&
                            touched.nonFamilyTravelCompanions &&
                            touched.nonFamilyTravelCompanions[index].lastName && (
                              <div className="field-error">
                                {errors.nonFamilyTravelCompanions[index].lastName}
                              </div>
                            )}
                        </div>
                        <div className="col-lg-6 form-group ">
                          <label htmlFor={`nonFamilyTravelCompanions.${index}.firstName`}><FormattedMessage id="nav.item.firstGivenName" defaultMessage="First (Given) Name"/></label>
                          <Field className="form-control"
                            name={`nonFamilyTravelCompanions.${index}.firstName`}
                            type="text"
                          />
                          {errors.nonFamilyTravelCompanions &&
                            errors.nonFamilyTravelCompanions[index] &&
                            errors.nonFamilyTravelCompanions[index].firstName &&
                            touched.nonFamilyTravelCompanions &&
                            touched.nonFamilyTravelCompanions[index].firstName && (
                              <div className="field-error">
                                {errors.nonFamilyTravelCompanions[index].firstName}
                              </div>
                            )}
                        </div>
                           </div>
                           <div className="row">
                           <div className="col-lg-1">
                            <label htmlFor={`nonFamilyTravelCompanions.${index}.seatNumber`}><FormattedMessage id="nav.item.seat" defaultMessage="Seat"/></label>
                            <Field className="form-control"
                              name={`nonFamilyTravelCompanions.${index}.seatNumber`}
                              type="smalltext"
                            />
                            {errors.nonFamilyTravelCompanions &&
                              errors.nonFamilyTravelCompanions[index] &&
                              errors.nonFamilyTravelCompanions[index].seatNumber &&
                              touched.nonFamilyTravelCompanions &&
                              touched.nonFamilyTravelCompanions[index].seatNumber && (
                                <div className="field-error">
                                  {errors.nonFamilyTravelCompanions[index].seatNumber}
                                </div>
                              )}
                          </div>
                          <div className="col-lg-2 form-group">
                              <label htmlFor={`nonFamilyTravelCompanions.${index}.dateOfBirth`}><FormattedMessage id="nav.item.dateOfBirth" defaultMessage="Date Of Birth"/></label>
                              <Field className="form-control"
                                name={`nonFamilyTravelCompanions.${index}.dateOfBirth`}
                                type="date"
                              />
                              {errors.nonFamilyTravelCompanions &&
                                errors.nonFamilyTravelCompanions[index] &&
                                errors.nonFamilyTravelCompanions[index].dateOfBirth &&
                                touched.nonFamilyTravelCompanions &&
                                touched.nonFamilyTravelCompanions[index].dateOfBirth && (
                                  <div className="field-error">
                                    {errors.nonFamilyTravelCompanions[index].dateOfBirth}
                                  </div>
                                )}
                            </div>
                              <div className="col-lg-2 form-group">
                                <MySelect
                                  label=<FormattedMessage id="nav.item.sex" defaultMessage="Sex"/> 
                                  name={`nonFamilyTravelCompanions.${index}.gender`}>
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                </MySelect>
                                {errors.nonFamilyTravelCompanions &&
                                  errors.nonFamilyTravelCompanions[index] &&
                                  errors.nonFamilyTravelCompanions[index].gender &&
                                  touched.nonFamilyTravelCompanions &&
                                  touched.nonFamilyTravelCompanions[index].gender && (
                                    <div className="field-error">
                                      {errors.nonFamilyTravelCompanions[index].gender}
                                    </div>
                                  )}
                              </div>
                              <div className="col-lg-3 form-group">
                                <label htmlFor={`nonFamilyTravelCompanions.${index}.nationality`}><FormattedMessage id="nav.item.nationality" defaultMessage="Nationality"/></label>
                                <Field className="form-control"
                                  name={`nonFamilyTravelCompanions.${index}.nationality`}
                                  type="medtext"
                                />
                                {errors.nonFamilyTravelCompanions &&
                                  errors.nonFamilyTravelCompanions[index] &&
                                  errors.nonFamilyTravelCompanions[index].nationality &&
                                  touched.nonFamilyTravelCompanions &&
                                  touched.nonFamilyTravelCompanions[index].nationality && (
                                    <div className="field-error">
                                      {errors.nonFamilyTravelCompanions[index].nationality}
                                    </div>
                                  )}
                              </div>
                              <div className="col-lg-3 form-group">
                                  <label htmlFor={`nonFamilyTravelCompanions.${index}.passportNumber`}><FormattedMessage id="nav.item.passportNumber" defaultMessage="Passport Number"/></label>
                                  <Field className="form-control"
                                    name={`nonFamilyTravelCompanions.${index}.passportNumber`}
                                    type="medtext"
                                  />
                                  {errors.nonFamilyTravelCompanions &&
                                    errors.nonFamilyTravelCompanions[index] &&
                                    errors.nonFamilyTravelCompanions[index].passportNumber &&
                                    touched.nonFamilyTravelCompanions &&
                                    touched.nonFamilyTravelCompanions[index].passportNumber && (
                                      <div className="field-error">
                                        {errors.nonFamilyTravelCompanions[index].passportNumber}
                                      </div>
                                    )}
                                </div>
                                <div className="col-lg-1">
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
              	       </div>
                       </div>
                      
                      </div>
                      
                    ))}
                   <div className="row">
                   <div className="col-lg-12 ">
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ lastName: "", firstName: "" })}
                  >
                  <FormattedMessage id="nav.item.addTravelCompanionNonFamily" defaultMessage="Add Travel Companion Non-Family"/>
                  </button>
         	       </div>
                   </div>
                </div>
              )}
            />            
                   <div className="row">
                   <div className="col-lg-12 ">
                   <table> 
                   <td>
                   <MyCheckbox name="acceptedTerms">
                   <FormattedMessage id="nav.item.declareInformation" defaultMessage="*I declare that the information I have given is true and complete. I understand that I shall commit an offence if I fail to fill the form or knowingly submit false information."/>
                   </MyCheckbox>
                     </td>
                     </table>
         	       </div>
                   </div>
                   <div className="row">
                   <div className="col-lg-12 ">
                     <table>
                     <td>
                  <button type="submit">Submit</button> 	
                  { this.state.submitErrorMessage &&
                	  <div className="error"> { this.state.submitErrorMessage } </div> }
                     </td>
                  </table>
         	       </div>
                   </div>
         	      </Form>
         	       </div>
                   </div>
                 );
               }}
             />
          </div>
        </div>
    </div>
    </div>
  );
  }
}

export default Home;
interface IGlobalStrings {
    login: ILogin;
    support: ISupport;
    simulation: ISimulation;
    pending_n_alerts: IPending_n_alerts;
    holdings_investment_schedule: IHoldings_investment_schedule;
    account: IAccount;
    investment_opportunities: IInvestment_opportunities;
    global: IGlobal;
    Witch_list_N_Simulations: IWitch_list_N_Simulations;
    FAQ: IFAQItem[];
    Investor_offer: IInvestor_offer;
}
interface ILogin {
    signIn: string;
    headerLine2: string;
    setPasswordHeader: string;
    passwordRequired: string;
    tempPassword: string;
    newPassword: string;
    veifyPassword: string;
    accrediteCheckboxError: string;
    ssePopup: string;
    continueButton: string;
    emailRequired: string;
    forgotPassword: string;
    successMessage: string;
    rememberMe: string;
    matchPassword: string;
    accreditedInvestors: string;
    accreditedInvestorUrl: string;
    accreditedAlertMessage: string;
    resetEmail: string;
    resetTitle: string;
    resetButton: string;
    resetEmailConformtion: string;
    resetEmailErrorNotExists: string;
    resetEmailError: string;
}
interface ISupport {
    hereForYou: string;
    leaveMessageFirstLine: string;
    leaveMessageSecondLine: string;
    subjectPlaceHolder: string;
    yourMessagePlaceHolder: string;
    submitButton: string;
    supportEmailFirstLine: string;
    supportEmailSecondLine: string;
    faqTitle: string;
    messageSentPopup: string;
    requiredMessage: string;
}
interface ISimulation {
    unavailblePage: string;
}
interface IPending_n_alerts {
    faceValue: string;
    minInvest: string;
    viewOffer: string;
    kycCardTitle: string;
    kycCardContent: string;
    accreditedCardTitle: string;
    accreditedCardContent: string;
    upload: string;
    uploadNow: string;
    accreditedPopupHeader: string;
    popupText: string;
    personalInfoCardTitle: string;
    personalInfoCardContent: string;
    updateNowButton: string;
    startButton: string;
    financialInfoCardTitle: string;
    financialInfoCardContent: string;
    uploadSuccessMessage: string;
    uploadSuccessPermanentMessage: string;
    AuthorizedUploadOfDoc: string;
    AuthorizedUploadOfDocButten: string;
    AccreditedUploadSuccessfully: string;
}
interface IHoldings_investment_schedule {
    faceValue: string;
    minInvest: string;
    viewOffer: string;
    investorOpportunity: string;
    buildAlternativeProtfolio: string;
}
interface IAccount {
    pageTitle: string;
    basicInformation: string;
    firstName: string;
    lastName: string;
    resetPassword: string;
    contactInformation: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    password: string;
    phoneNumber: string;
    linkedIn: string;
    facebook: string;
    save: string;
    savedMessage: string;
}
interface IInvestment_opportunities {
    investNowPopup: string;
    investNowPopupSuccess: string;
    offerNumber: string;
    faceValue: string;
    minInvest: string;
    viewOffer: string;
    avgDuration: string;
    avgIrr: string;
    investNow: string;
    simulation: string;
    unavailblePage: string;
    popup1header: string;
    popup1content: string;
    popup1button: string;
    popup2content: string;
    popup2button: string;
    popup3content: string;
    popup3button: string;
    popup4content: string;
    popup4button: string;
    popup4chekbox: string;
    popupInOfferChekbox: string;
    popupInOfferChekboxButton: string;
    popupInOfferGoToWitchList: string;
    buttonaddtowatchlist: string;
    buttonclicked: string;
}
interface IGlobal {
    genericCopyright: string;
}
interface IWitch_list_N_Simulations {
    buttongotoinvestmentopportunity: string;
    buttonsimulateandinvest: string;
    popupInOfferChekbox1: string;
    popupInOfferChekbox2: string;
    popupInOfferChekbox3: string;
    popupInOfferChekbox4: string;
    popupInOfferChekbox5: string;
    popupInOfferChekbox: string;
    PopupDeleteFromWitchList: string;
    PopuoIfNotCompietKYCetc: string;
    PopuoIfNotCompietKYCetcButten: string;
    Feedbackpopupforinvestment: string;
}
interface IFAQItem {
    question: string;
    answer: string;
}
interface IInvestor_offer {
    NNNNN: string;
    headerline1: string;
    headerline2: string;
    firstParagrah: string;
    totalSummaryHeader: string;
    totalSummaryPg: string;
    totalCommitmentHeader: string;
    example: string;
    investmentPurchase: string;
    annualInvestmentHeader: string;
    investmentOverview: string;
    returnScheduleHeader: string;
    lifeExpectancyProvider: string;
    tableDisclaimer: string;
    policyOverviewHeader: string;
    keyInfo: string;
    numberOfPolicy: string;
    numberPolicyholders: string;
    insuranceCarrier: string;
    faceAmount: string;
    insuranceRating: string;
    primaryCategory: string;
    age: string;
    gender: string;
    faq: string;
    qa_whoInvest: string;
    qa_whoInvest_a: string;
    qa_myExpected: string;
    qa_myExpected_a: string;
    qa_whenGetPaid: string;
    qa_whenGetPaid_a: string;
    qa_howMuchInvest: string;
    qa_howMuchInvest_a: string;
    qa_risksConsider: string;
    qa_risksConsider_a: string;
    qa_investmentInstallments: string;
    qa_investmentInstallments_a: string;
    qa_whySellingPolicy: string;
    qa_whySellingPolicy_a: string;
    qa_whatHappens: string;
    qa_whatHappens_a: string;
    disclaimerHeader: string;
    disclaimer: string;
    investNow: string;
    investmentByList: string;
    publishNow: string;
    investAmount: string;
    investSummary: string;
    initInvest: string;
    viewOffer: string;
    noteText: string;
    noteHeader: string;
    investNowPopup: string;
    investNowPopupSuccess: string;
    learnMore: string;
    learMorePopup: string;
    learnMorePopupSuccess: string;
    addWatchListButton: string;
}

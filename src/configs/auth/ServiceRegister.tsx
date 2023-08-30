import Axios from "../Axios";
export const serviceRegister = ({
    token,
    lang,
    phone,
    email,
    web,
    number_of_employees,
    business,
    domain_name,
    company,
    contact,
    cooperation_partner,
    country_state_id,
    partner_industry_id,
    partner_job_id,
    service_code,
    vat,
    description
}: any) => {
    const url = '/erpviet_webservice/create_crm_lead';
    const body = {
        token,
        lang,
        phone,
        email,
        web,
        number_of_employees,
        business,
        domain_name,
        company,
        contact,
        cooperation_partner,
        country_state_id,
        partner_industry_id,
        partner_job_id,
        service_code,
        vat,
        description
    };
    console.log("????????????????", body);
    return Axios.post(url , body );
};

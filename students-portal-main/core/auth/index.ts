// provide fuctions to interact with ldap server
import { config } from "dotenv";
// @ts-ignore
import { authenticate } from "ldap-authentication";

config();
export const ldapAuth = async (username:string, password:string) => {
  let options = {
    ldapOpts: {
      url: `ldap://${process.env.URL}:${process.env.PORT}`,
      // tlsOptions: { rejectUnauthorized: false }
    },
    adminDn: process.env.ADMIN_DN,
    adminPassword: process.env.ADMIN_PASSWORD,
    userPassword: password,
    userSearchBase: process.env.USER_SEARCH_BASE,
    usernameAttribute: process.env.USERNAME_ATTRIBUTE,
    username : username
};
return await authenticate(options);
};

ldapAuth(process.env.TEST_USER!, process.env.TEST_PASS!)
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});
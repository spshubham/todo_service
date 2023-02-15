const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")

const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
chai.use(chaiAsPromised);


describe("test_isValidRegisterUserBody",()=>{
  
    it("test_isValidRegisterUserBody_success",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":24,"city": "Sangli", "name":"SP", "role":"User"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(true)
    })
    it("test_isValidRegisterUserBody_Invalid_pass",async()=>{
        let body = {"password": "1234","email":"sp@gmail.com","age":24,"city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_email",async()=>{
        let body = {"password": "12345678","email":"sp","age":24,"city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_age",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":"24","city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_name",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":24,"city": "Sangli", "name":1}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid-city",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":24,"city": 1, "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
})

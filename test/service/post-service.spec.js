const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")
const postService = require("../../service/post")
const db = require("../../db/post.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
chai.use(chaiAsPromised);

describe("test_post_service_add",()=>{
    let addStub;
    beforeEach(()=>{
        
        addStub = sinon.stub(db,"postAdd");
    })
    it("test_post_service_success",async()=>{
        
        addStub.returns({code: 200,msg:"todo added"})
        let body = {"todo_name": "sp.com","todo_lists":["sp"]}
        let res = await postService.postAdd(body)
        expect(res.code).to.be.equals(200)
    })
    it("test_post_service_fail_for_invalid_req_body",async()=>{
        let body = {"frequency":1}
        postService.postAdd(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_post_service_for_invalid_req_params",async()=>{
        let body = {"url_name": "sp.com","frequency":1}
        postService.postAdd(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_post_service_fail_for_unexpected_error",async()=>{
        addStub.throws("error")
        let body = {"url_name": "sp.com","frequency":1}
        postService.postAdd(body).catch(function(err){
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})
describe("test_post_service_update",()=>{
    let addStub;
    beforeEach(()=>{
        addStub = sinon.stub(db,"postComments");
    })
    it("test_post_service_success",async()=>{
        addStub.returns({code: 200,msg:"url added"})
        let body = {"url_name": "sp.com","frequency":1}
        let res = await postService.postComments(body, "63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(200)
    })
    it("test_post_service_not_found",async()=>{
        addStub.returns(false)
        let body = {"url_name": "sp.com","frequency":1}
        let res = await postService.postComments(body, "63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res).to.be.equals(false)
    })
    it("test_post_service_fail_for_invalid_req_body",async()=>{
        let body = {"frequency":1}
        postService.postComments(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_post_service_fail_for_invalid_req_params",async()=>{
        let body = {"url_name": "sp.com","frequency":1}
        postService.postComments(body,"63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_post_servicerl_fail_for_unexpected_error",async()=>{
        addStub.throws("error")
        let body = {"url_name": "sp.com","frequency":1}
        postService.postComments(body,"63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){console.log(err);
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})
describe("test_post_service_list",()=>{
    let addStub;
    beforeEach(()=>{

        addStub = sinon.stub(db,"listPost");
    })
    it("test_post_service_success",async()=>{
       
        addStub.returns("url added")
     
        let res = await postService.listPost()

        expect(res).to.be.equals("url added")
    })
    it("test_post_service_not_founds",async()=>{
        addStub.returns(false)
        let res = await postService.listPost()
        
        expect(res).to.be.equals(false)
    })
    it("test_post_service_unexpected_error",async()=>{
        addStub.throws("error")

        postService.listPost().catch(function(err){
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})

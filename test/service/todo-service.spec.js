const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")
const todoService = require("../../service/todo")
const db = require("../../db/todo.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
chai.use(chaiAsPromised);

describe("test_todo_service_add",()=>{
    let addStub;
    beforeEach(()=>{
        addStub = sinon.stub(db,"todoAdd");
    })
    it("test_todo_service_success",async()=>{
        
        addStub.returns({code: 200,msg:"todo added"})
        let body = {"todo_name": "sp.com","todo_lists":["sp"]}
        let res = await todoService.todoAdd(body)
        expect(res.code).to.be.equals(200)
    })
    it("test_todo_service_fail_for_invalid_req_body",async()=>{
        let body = {"frequency":1}
        todoService.todoAdd(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_todo_service_for_invalid_req_params",async()=>{
        let body = {"url_name": "sp.com","frequency":1}
        todoService.todoAdd(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_todo_service_fail_for_unexpected_error",async()=>{
        addStub.throws("error")
        let body = {"url_name": "sp.com","frequency":1}
        todoService.todoAdd(body).catch(function(err){
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})
describe("test_todo_service_update",()=>{
    let addStub;
    beforeEach(()=>{

        addStub = sinon.stub(db,"updateTodo");
    })
    it("test_todo_service_success",async()=>{

        addStub.returns({code: 200,msg:"url added"})
        let body = {"url_name": "sp.com","frequency":1}
        let res = await todoService.updateTodo(body, "63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(200)
    })
    it("test_todo_service_not_found",async()=>{

        addStub.returns(false)
        let body = {"url_name": "sp.com","frequency":1}
        let res = await todoService.updateTodo(body, "63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(404)
    })
    it("test_todo_service_fail_for_invalid_req_body",async()=>{
        let body = {"frequency":1}
        todoService.updateTodo(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_todo_service_fail_for_invalid_req_params",async()=>{
        let body = {"url_name": "sp.com","frequency":1}

        todoService.updateTodo(body,"63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_todo_servicerl_fail_for_unexpected_error",async()=>{
        addStub.throws("error")

        let body = {"url_name": "sp.com","frequency":1}
        todoService.updateTodo(body,"63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){console.log(err);
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{

        addStub.restore();
    })
})
describe("test_todo_service_list",()=>{
    let addStub;
    beforeEach(()=>{

        addStub = sinon.stub(db,"listTodo");
    })
    it("test_todo_service_success",async()=>{
       
        addStub.returns("url added")
     
        let res = await todoService.listTodo()

        expect(res).to.be.equals("url added")
    })
    it("test_todo_service_not_found",async()=>{
        addStub.returns(false)
        let res = await todoService.listTodo()
        expect(res.code).to.be.equals(404)
    })
    it("test_todo_service_unexpected_error",async()=>{
        addStub.throws("error")

        todoService.listTodo().catch(function(err){
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})

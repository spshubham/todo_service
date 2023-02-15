const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")

const db = require("../../db/todo.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
const todoModel = require("../../models/todo.model")
const bcrypt = require("bcrypt")
chai.use(chaiAsPromised);


describe("test_add_url_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(todoModel.prototype,"save");

    })
    it("test_todo_service_register_user_success",async()=>{
       
        createStub.returns({code: 200,msg:"Todo created"})
        let body = {"name": "SP"}
        let res = await db.todoAdd(body, "ac12sa")
        expect(res.code).to.be.equals(200)
    })
    it("test_todo_service_user_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.todoAdd(body, "ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_todo_service_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.todoAdd(body,"ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})


describe("test_update_todo_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(todoModel,"findOneAndUpdate");

    })
    it("test_update_todo_success",async()=>{
       
        createStub.returns({code: 200,msg:"Url updated"})
        let body = {"name": "SP"}
        let res = await db.updateTodo(body, "ac12sa","ac12sa")
        expect(res.code).to.be.equals(200)
    })
    it("test_update_todo_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.updateTodo(body, "ac12sa","ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_update_todo_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.updateTodo(body,"ac12sa","ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})

describe("test_list_todo_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(todoModel,"find");

    })
    it("test_list_todo_success",async()=>{
       const mockSelect={
        limit: function(){return this;},
        skip: function(){
            return {code:200, url_name:"Url Name"}
        }
       }
        createStub.returns(mockSelect)
 
        let res = await db.listTodo("63c962e85913cb98539edab9")
        expect(res.code).to.be.equals(200)
    })
    it("test_list_todo_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.listTodo("63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_list_todo_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.listTodo("63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})


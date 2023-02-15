const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")

const db = require("../../db/post.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
const postModel = require("../../models/post.model")
const bcrypt = require("bcrypt")
chai.use(chaiAsPromised);


describe("test_add_post_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(postModel.prototype,"save");

    })
    it("test_add_post_db_success",async()=>{
       
        createStub.returns({code: 200,msg:"Todo created"})
        let body = {"name": "SP"}
        let res = await db.postAdd(body, "ac12sa")
        expect(res.code).to.be.equals(200)
    })
    it("test_add_post_db_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.postAdd(body, "ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_add_post_db_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.postAdd(body,"ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})


describe("test_post_comments_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(postModel,"findOneAndUpdate");

    })
    it("test_post_comments_db_success",async()=>{
       
        createStub.returns({code: 200,msg:"Url updated"})
        let body = {"name": "SP"}
        let res = await db.postComments(body, "ac12sa","ac12sa")
        expect(res.code).to.be.equals(200)
    })
    it("test_post_comments_db_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.postComments(body, "ac12sa","ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_post_comments_db_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.postComments(body,"ac12sa","ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})

describe("test_list_post_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(postModel,"find");

    })
    it("test_list_post_success",async()=>{
       const mockSelect={
        limit: function(){return this;},
        skip: function(){
            return {code:200, url_name:"Url Name"}
        }
       }
        createStub.returns(mockSelect)
 
        let res = await db.listPost("63c962e85913cb98539edab9")
        expect(res.code).to.be.equals(200)
    })
    it("test_list_post_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.listPost("63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_list_post_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.listPost("63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})


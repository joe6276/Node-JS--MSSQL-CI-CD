import { ConnectionPool, Request } from "mssql";
import mssql from 'mssql'
import { sqlConfig } from '../Config'
export class DbHelper{

    
    // make a request
    // add inputs if any
    //execute procedure / run query
    //get results if any 
    private pool :Promise<ConnectionPool>
    constructor() {
        // make a connection
        this.pool= mssql.connect(sqlConfig) 
    }

    private createRequest(emptyRequest:Request, data:{[x:string]: string|number}){
        // data={name:"john", age:10}
        //
        const keys = Object.keys(data)//['name', 'age']
        keys.map(key=>{
            emptyRequest.input(key, data[key])
        })
        return emptyRequest
    }

    async exec(storedprocedure:string, data:{[x:string]: string|number}){
        //make a request
        const emptyRequest= (await this.pool).request()
        const request=this.createRequest(emptyRequest,data)
        let results= (await request.execute(storedprocedure))
        return results
    }

    async query(queryString:string){
        return (await ((await this.pool).request().query(queryString)))
    }
}
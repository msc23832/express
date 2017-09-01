import { Router, Request, Response } from 'express';
import * as pg from 'pg';
import * as postgres from '../../helpers/postgres';
const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    let data = req.body;

    postgres.doQuery(`insert into tb_customer (cust_code, cust_name, comp_code) values ('${data.custCode}','${data.custName}','${data.compCode}')`, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});

router.get('/', (req: Request, res: Response) => {

    postgres.doQuery(`select * from tb_customer`, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result.rows);
        }
    });
});

router.put('/:id', (req: Request, res: Response) => {
    
    let data = req.body;
    console.log(data);

    postgres.doQuery(`update tb_customer set cust_code = '${data.custCode}', cust_name = '${data.custName}', comp_name = '${data.compCode}' where cust_code = '${req.params.id}' `, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result.rows);
        }
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    let data = req.body;

    postgres.doQuery(`delete from tb_customer where cust_code = '${req.params.id}' `, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result.rows);
        }
    });
});


export const CustomerController: Router = router;
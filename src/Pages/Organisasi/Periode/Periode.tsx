import axios from "axios";
// import {Link, useNavigate} from "react-router-dom";
// import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "react-query";

export const Periode = () => {
    const {register, handleSubmit, watch, formState: {errors},} = useForm()

    function GetPeriode() {
        const {isLoading, error, data, isFetching} = useQuery({
            queryKey: ['repoDataKota'],
            queryFn: () =>
                axios
                    .get(process.env.REACT_APP_BASE_URL + '/ormawa/kantaya-periode-ormawa/getPeriode/')
                    .then((resp) => resp.data),
        })
        if (data) {
            return (
                <>
                    {data.map((item:any, key:any) => {
                        return (
                            <tr key={key}>
                                <td>{++key}</td>
                                <td>{item.event}</td>
                                <td>{item.start_at}</td>
                                <td>{item.end_at}</td>
                            </tr>
                        )
                    })}
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    // @ts-ignore
    const mutation = useMutation({
        mutationFn: (data:any) => {
            return axios.post(process.env.REACT_APP_BASE_URL + '/ormawa/kantaya-periode-ormawa/insertPeriode/', data)
        },
    })
    const onSubmit = (e:any) => {
        mutation.mutate(e)
        // axios.post(process.env.REACT_APP_BASE_URL + '/ormawa/kantaya-periode-ormawa/insertPeriode/', e).then(r => console.log(r));
    }
    return (
        <>
            <div className={'card p-1 pt-3'}>
                <div className={''}>
                    <div className="px-3">
                        <button className="nav-link btn btn-icon btn-3 rounded-pill btn-success d-flex"
                                data-bs-toggle="modal"
                                data-bs-target="#modalNewPeriode" type="button">
                            <span className="btn-inner--icon d-flex m-auto me-2"><i
                                className="m-auto ni ni-fat-add"></i></span>
                            <span className="btn-inner--text">Tambah Periode</span>
                        </button>
                        <div className="modal fade" id="modalNewPeriode" role="dialog"
                             aria-labelledby="modalNewPeriode"
                             aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Tambah Periode</h5>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} name={'formPeriode'} id={'formPeriode'} className="modal-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Event Periode</label>
                                                    <input type="text" className="form-control" {...register('event')}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label>Tanggal Mulai</label>
                                                    <input type="date"
                                                           className="form-control" {...register('start_at')}></input>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>Tanggal Berakhir</label>
                                                        <input type="date"
                                                               className="form-control" {...register('end_at')}></input>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                        </button>
                                        <button type="submit" form={'formPeriode'}
                                                className="btn btn-primary">Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-flush" id="datatable-search">
                            <thead className="thead-light">
                            <tr>
                                <th>No</th>
                                <th>Event</th>
                                <th className="text-center">Tanggal Mulai</th>
                                <th className="text-center">Tanggal Berakhir</th>
                            </tr>
                            </thead>
                            <tbody>
                            <GetPeriode/>
                            {/*{organisasis ?*/}
                            {/*    organisasis.map((item, id) => {*/}
                            {/*        return (*/}
                            {/*            <Report item={item} key={id}/>*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*    :*/}
                            {/*    <></>*/}
                            {/*}*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
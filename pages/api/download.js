export default async function (req, res) {
    let url
    try{
       const getUrl = await fetch(`https://api.infomaniak.com/2/drive/608492/files/${req.body.file_id}/temporary_url`,{
        method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
        url = await getUrl.json()
    } catch(err){
        return res.status(500).json({err: err.message || err.toString()})
    }
    return res.status(200).json({url: url.data.temporary_url})
}
const base = "http://44.206.250.73:5000";

export const get_all_submissions = async(obj) => {
    const res = await fetch(`${base}/submissions/all`, {
        method: 'GET',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}
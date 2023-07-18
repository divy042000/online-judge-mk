const base = "http://localhost:5000";

export const get_all_problems = async(obj) => {
    const res = await fetch(`${base}/problems/all`, {
        method: 'GET',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const get_problem_by_id = async(obj) => {
    const res = await fetch(`${base}/problems/get_prob_by_id`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const run_compiler = async(obj) => {
    const res = await fetch(`${base}/problems/run`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const submit_compiler = async(obj) => {
    const res = await fetch(`${base}/problems/submit`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}
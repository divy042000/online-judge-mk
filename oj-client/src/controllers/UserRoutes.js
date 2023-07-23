const base = "http://localhost:5000";

export const register_user = async(obj) => {
    const res = await fetch(`${base}/user/signup`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const login_user = async(obj) => {
    const res = await fetch(`${base}/user/login`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const auth_user = async(obj) => {
    const res = await fetch(`${base}/user/auth`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const get_user_by_id = async(obj) => {
    const res = await fetch(`${base}/user/get_user_by_id`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

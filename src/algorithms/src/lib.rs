mod utils;

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct Node {
    weight: u32,
    nodeType: u32,
    prevNode: Option<Box<Node>>
}

pub enum NodeType {
    Start,
    Finish,
    Normal
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn dijkstra(grid: JsValue, source: JsValue) -> u32 {
    let grid: Vec<Vec<Node>> = grid.into_serde().unwrap();
    let source: Node = source.into_serde().unwrap();
    source.nodeType
}
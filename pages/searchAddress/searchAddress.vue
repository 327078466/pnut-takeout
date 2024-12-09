<template>
	<view class="container">
		<!-- 搜索框 -->
			 <view class="search-bar">
				 <view class="search-bar-box">
				 <image class="search-span" src="../../static/index_image/search.png"/>
				 <input type="text" value=""  placeholder="请输入地址" class="search-text" maxlength="10" focus/>
				 <button class="search-btn">搜索</button>
				 </view>
			 </view>
			 <view class="currentAdd">
				 <text style="margin-left: 20rpx;">
					 {{currentAdd}}
				 </text>
				 <image class="dingweiImage" src="../../static/index_image/dingwei.png"></image>
				 <text style="color: #f6cc66;">定位当前位置</text>
			 </view>
	</view>
	
	

</template>

<script>
	export default {
		data() {
			return {
				currentAdd:'测试'
			}
		},
		methods: {
			
		},
		mounted(){
			console.log("")
		},
		onLoad(options){
			const obj = options.obj;
			const shopStr = decodeURIComponent(obj); // 解码 URL 参数
			console.log('obj',shopStr)
			this.currentAdd = JSON.parse(shopStr)
		},
		mounted(options){
			
		}
	}
</script>

<style>
	@import url('./searchAddress.css');

	.divBody .divMenu .mescro-uni {
		height: calc(100vh - var(--height));
	}
</style>

<template>
	<view class="container">
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;">
					
		</view>
		<scroll-view class="scroll-container" :scroll-top="scrollTop" scroll-y="true">
			<!-- 搜索框 -->
				 <view class="search-bar">
					 <view class="search-bar-box">
					 <image class="search-span" src="../../static/index_image/search.png"/>
					 <input type="text" v-model="searchKey"  placeholder="请输入地址" class="search-text" maxlength="10" focus/>
					 <button class="search-btn" @click="searchAddress">搜索</button>
					 </view>
				 </view>
				 <view class="currentAdd" >
					 <view class="addLeft" @click="checkAddress(currentAdd)">
						 <text style="margin-left: 20rpx;" class="currentAddText">
						 					 {{currentAdd.address}}
						 </text>
					 </view>
					 <view class="addRight" @click="getLocation">
						 <image class="dingweiImage" src="../../static/index_image/dingwei.png"></image>
						 <text style="color: #f6cc66;">定位当前位置</text>
					 </view>
				 </view>
				 <view>
					 <view style="display: flex;align-items: center;justify-content: space-between;">
						 <view style="margin-left: 20rpx;display: flex;align-items: center;height: 100rpx;">
						 					 <image src="/static/index_image/location.png" class="location_image"></image>
						 					 <text style="font-size: 30rpx;">收货地址</text>
						 </view>
						 <view style="margin-right: 20rpx;" @click="addAddress">
							 <view style="margin-left: 20rpx;display: flex;align-items: center;height: 100rpx;">
							 					 <image src="/static/index_image/location.png" class="location_image"></image>
							 					 <text style="font-size: 20rpx;">新增收货地址</text>
							 </view>
						 </view>
					 </view>
					 <view class="addressDeli" v-for="(item,index) in myaddressList" :key="index" @click="() => checkAddress(item.detail)">
						<view style="display: flex;flex-direction: column;justify-content: center;margin-left: 20rpx;">
							<view style="margin-top: 10rpx;">
								<text style="font-size: 30rpx;">{{item.provinceName + item.cityName + item.districtName + item.detail}}</text>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<text style="font-size: 25rpx;">收货人：{{item.consignee}}({{item.gender == 1?'先生':'女士'}}) 电话：{{item.phone}}</text>
							</view>
						</view>
						<view style="margin-right: 20rpx;border:1rpx ;border-radius: 20rpx;background-color: #f6cc66;">
							<text style="margin: 15rpx;">{{item.label}}</text>
						</view>
					 </view>
				 </view>
				 
				 <view>
				 				 <view style="display: flex;align-items: center;justify-content: space-between;">
				 					 <view style="margin-left: 20rpx;display: flex;align-items: center;height: 100rpx;">
				 					 					 <image src="/static/index_image/location.png" class="location_image"></image>
				 					 					 <text style="font-size: 30rpx;">搜索附近地址</text>
				 					 </view>
				 				 </view>
				 				 <view class="addressDeli" v-for="(item,index) in searchAddressList" :key="index" @click="() => checkAddress(item.address)">
				 					<view style="display: flex;flex-direction: column;justify-content: center;margin-left: 20rpx;">
				 						<view style="margin-top: 10rpx;">
				 							<text style="font-size: 30rpx;">{{item.title}}</text>
				 						</view>
				 						<view style="display: flex;align-items: center;justify-content: space-between;">
				 							<text style="font-size: 25rpx;">{{item.province + item.city + item.district + item.address}}</text>
				 						</view>
				 					</view>
				 				<!-- 	<view style="margin-right: 20rpx;border:1rpx ;border-radius: 20rpx;background-color: #f6cc66;">
				 						<text style="margin: 15rpx;">{{item.category}}</text>
				 					</view> -->
				 				 </view>
				 </view>
		</scroll-view>
	</view>
	
	

</template>

<script>
	import {
		getLocation,getAddressBykeyword
	} from '../../api/mapaddress.js';
	import {
		addressListApi,addAddressApi
	} from '../../api/address.js';
	export default {
		data() {
			return {
				scrollTop :0,
				currentAdd:{address:'测试'},
				lat:'',
				lng:'',
				searchKey: '',
				myaddressList: [],
				searchAddressList:[]
			}
		},
		mounted() {
			// 页面加载时设置 scrollTop 为 0
			this.scrollTop = 0;
		},
		methods: {
			async getLocation() {
				try {
					console.log("开始获取经纬度")
					const res = await new Promise((resolve, reject) => {
						uni.getLocation({
							type: 'wgs84',
							success: resolve,
							fail: reject
						});
					});
					this.lat = res.latitude;
					this.lng = res.longitude;
					console.log('获取位置成功：', this.lat, this.lng);
					// 获取地址信息
					await this.getAddress();
				} catch (err) {
					console.error('获取位置失败：', err);
					// 使用默认位置
					this.lat = 39.9042; // 默认经度（示例值）
					this.lng = 116.4074; // 默认纬度（示例值）
					console.log('使用默认位置：', this.lat, this.lng);
					// 获取默认地址信息
					await this.getAddress();
				}
			},
			checkAddress(value){
				if(value){
					wx.setStorageSync('checkAddress', JSON.stringify(value));
					uni.switchTab({
						url: `/pages/index/index`
					});
				}else{
					uni.showModal({
						title: '提示',
						content: '地址不合法',
						showCancel: false,
						success: function(res) {
							
						},
					})
				}
			},
			addAddress(){
				const token = wx.getStorageSync('token')
				if(token){
					uni.navigateTo({
						url: `/pages/address/address`
					});
				}else{
					uni.showModal({
						title: '提示',
						content: '请登录',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/my/my'
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				
			},
			async getAddress() {
				try {
					console.log("开始获取经纬度")
					const response = await getLocation({
						lat: this.lat,
						lng: this.lng
					});
					if (response.code === 0) {
						this.currentAdd = response.data;
						console.log('获取地址成功：', this.currentAdd);
					} else {
						console.error('获取地址失败：', response.message);
						this.currentAdd = '无法获取地址';
					}
				} catch (err) {
					console.error('请求地址失败：', err);
					this.currentAdd = '无法获取地址';
				}
			},
			async getAddressList(){
				console.log("开始获取收货地址")
				// 首先判断当前用户是否登录 登录则查询收货地址 未登录则返回空
				const token = wx.getStorageSync('token')
				if(token){
					const res = await addressListApi()
					if (res.code === 0) {				
						this.myaddressList = res.data
						console.log(this.myaddressList)
					} else {				
						this.$message.error(res.msg)
					}
				}
				
			},
			async searchAddress(){
				try {
					console.log("开始搜索")
					const response = await getAddressBykeyword({
						searchKey: this.searchKey,
					});
					if (response.code === 0) {
						this.searchAddressList = response.data;
						console.log('获取地址成功：', this.searchAddressList);
					} else {
						console.error('获取地址失败：', response.message);
					}
				} catch (err) {
					console.error('请求地址失败：', err);
				}
			}
			
		},
		onLoad(options){
			const obj = options.obj;
			const shopStr = decodeURIComponent(obj); // 解码 URL 参数
			this.currentAdd.address = shopStr
			
			// 初始化数据
			this.getAddressList()
		},
	}
</script>

<style>
	@import url('./searchAddress.css');

	.divBody .divMenu .mescro-uni {
		height: calc(100vh - var(--height));
	}
</style>
